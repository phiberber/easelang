import DeclaredRuntime from "@interpreter/runtime/declared/DeclaredRuntime";
import RuntimeVariable from "@interpreter/runtime/declared/RuntimeVariable";
import {executeBlock} from "@interpreter/runtime/StatementExecutor";
import {DeclareFunction} from "@nodes/declare/DeclareFunction";
import Scope, {ScopeInternal} from "@interpreter/memory/Scope";
import computeNode from "@interpreter/runtime/NodeComputer";
import resolveNested from "@misc/resolveNested";

type DeclareNode = DeclareFunction

export default class RuntimeFunction extends DeclaredRuntime<DeclareNode> {

    public declaration: DeclareNode

    public constructor(declaration: DeclareNode) {
        super()
        this.declaration = declaration
    }

    public static internalReferenceName(name: string) {
        return `${ScopeInternal}${name}`
    }

    public execute(parameters: any[], scope: Scope) {
        const localScope = new Scope("local").implementParents(scope)

        if(this.isExternal) {
            const externFunction = resolveNested(this.declaration.identifier.content, global)
            return externFunction ? externFunction.call(null, ...parameters) : undefined
        }

        this.declaration.parameters.forEach((parameter, index) => {
            const parameterValue = parameters[index] || computeNode(parameter.default, scope)
            const runtimeVariable = new RuntimeVariable(parameter)
            localScope.set(parameter.identifier.content, parameterValue)
            localScope.set(RuntimeVariable.internalReferenceName(parameter.identifier.content), runtimeVariable)
        })

        return executeBlock(this.declaration.content, localScope)
    }

    public compute(path: string, scope: Scope) {
        return this
    }

}
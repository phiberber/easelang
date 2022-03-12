import {Scope, ScopeInternal} from "../../memory/Scope";
import {DeclareFunction} from "../../../shared/nodes/declare/DeclareFunction";
import {executeBlock} from "../StatementExecutor";
import {resolveNested} from "../../../shared/misc/ResolveNested";
import {computeNode} from "../NodeComputer";
import {DeclaredRuntime} from "./DeclaredRuntime";
import {RuntimeVariable} from "./RuntimeVariable";

type declareNode = DeclareFunction

export class RuntimeFunction extends DeclaredRuntime<declareNode> {

    public declaration: declareNode

    public constructor(declaration: declareNode) {
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
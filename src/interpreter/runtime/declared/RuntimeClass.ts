import DeclaredRuntime from "@interpreter/runtime/declared/DeclaredRuntime";
import {executeBlock} from "@interpreter/runtime/StatementExecutor";
import Scope, {ScopeInternal} from "@interpreter/memory/Scope";
import DeclareClass from "@nodes/declare/DeclareClass";

type DeclareNode = DeclareClass

export default class RuntimeClass extends DeclaredRuntime<DeclareNode> {

    public declaration: DeclareNode

    public constructor(declaration: DeclareNode) {
        super()
        this.declaration = declaration
    }

    public static internalReferenceName(name: string) {
        return `${ScopeInternal}${name}`
    }

    public init(parameters: any[], scope: Scope) {

        const intermediateScope = new Scope("intermediate").implementParents(scope)

        executeBlock(this.declaration.content, intermediateScope)

        return {
            declaration: this.declaration,
            scope: intermediateScope
        }

    }

    public compute(path: string, scope: Scope) {
        return this
    }

}
import Block from "../../../nodes/Block";
import {DeclareClass} from "../../../nodes/declare/DeclareClass";
import {executeBlock} from "../StatementExecutor";
import {Scope, ScopeInternal} from "../../memory/Scope";
import {DeclaredRuntime} from "./DeclaredRuntime";

type declareNode = DeclareClass

export class RuntimeClass extends DeclaredRuntime<declareNode> {

    public declaration: declareNode

    public constructor(declaration: declareNode) {
        super()
        this.declaration = declaration
    }

    public static internalReferenceName(name: String) {
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
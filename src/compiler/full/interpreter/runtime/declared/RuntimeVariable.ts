import {DeclareVariable} from "../../../nodes/declare/DeclareVariable";
import {Scope, ScopeInternal} from "../../memory/Scope";
import {DeclaredRuntime} from "./DeclaredRuntime";
import {resolveNested} from "../../../../../misc/ResolveNested";

type declareNode = DeclareVariable

export class RuntimeVariable<T> extends DeclaredRuntime<declareNode> {

    public declaration: declareNode

    public constructor(declaration: declareNode) {
        super()
        this.declaration = declaration
    }

    public static internalReferenceName(name: String) {
        return `${ScopeInternal}${name}`
    }

    public compute(path: string, scope: Scope): T {
        if(this.isExternal) {
            return resolveNested(this.declaration.identifier.content, global)
        }
        const {get: getValue} = scope.reference<T>(this.name)
        return getValue()
    }

    public update(value: T, scope: Scope) {
        const {set: storeVariable} = scope.reference(this.name)
        storeVariable(value)
    }

}
import Scope, {ScopeInternal} from "@interpreter/memory/Scope";
import DeclaredRuntime from "@interpreter/runtime/declared/DeclaredRuntime";
import DeclareVariable from "@nodes/declare/DeclareVariable";
import resolveNested from "@misc/resolveNested";

type DeclareNode = DeclareVariable

export default class RuntimeVariable<T> extends DeclaredRuntime<DeclareNode> {

    public declaration: DeclareNode

    public constructor(declaration: DeclareNode) {
        super()
        this.declaration = declaration
    }

    public static internalReferenceName(name: string) {
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
import {Declare} from "../../../shared/nodes/declare/Declare";
import Tag from "../../../shared/Tag";
import {Scope} from "../../memory/Scope";

export abstract class DeclaredRuntime<T extends Declare> {

    public declaration: T

    /**
     * Called when the declared runtime is fetched in the program.
     * Some kind of reflection, you can manipulate the return value by
     * returning this function.
     *
     * @param path: If used it as an object, path will be the object path.
     * @param scope: Scope that the runtime was referenced in.
     *
     */
    public abstract compute(path: string, scope: Scope): any

    public toString() {
        return this.declaration.toString()
    }

    public hasModifier(modifier: Tag) {
        return this.declaration.modifiers.includes(modifier)
    }

    public get name() { return this.declaration.identifier.content }
    public get isExternal() { return this.hasModifier(Tag.External) }

}
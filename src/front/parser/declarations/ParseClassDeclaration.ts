import Parser from "../Parser";
import Tag, {Modifiers} from "../../../shared/Tag";
import {DeclareClass} from "../../../shared/nodes/declare/DeclareClass";
import {parseBlock} from "../misc/ParseBlock";

export function parseClassDeclaration(this: Parser, modifiers: typeof Modifiers): DeclareClass {
    const startMatch = this.match(Tag.Class)
    const className = this.match(Tag.Identifier)
    const block = parseBlock.call(this, "Declare")
    return new DeclareClass(className, block, modifiers, startMatch.span.copy().expandEnd(block.span))
}
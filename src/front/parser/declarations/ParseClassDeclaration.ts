import parseBlock from "@front/parser/misc/ParseBlock";
import DeclareClass from "@nodes/declare/DeclareClass";
import Tag, {Modifiers} from "@shared/Tag";
import Parser from "@front/parser/Parser";

export default function parseClassDeclaration(this: Parser, modifiers: typeof Modifiers): DeclareClass {
    const startMatch = this.match(Tag.Class)
    const className = this.match(Tag.Identifier)
    const block = parseBlock.call(this, "Declare")
    return new DeclareClass(className, block, modifiers, startMatch.span.copy().expandEnd(block.span))
}
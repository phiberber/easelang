import ClassStatement from "@nodes/declare/ClassStatement";
import parseBlock from "@front/parser/misc/ParseBlock";
import parseIdentifier from "@front/parser/expressions/ParseIdentifier";
import Parser from "@front/parser/Parser";
import Tag from "@shared/Tag";

export default function parseClassDeclaration(this: Parser): ClassStatement {
    const startMatch = this.match(Tag.Class)
    const className = parseIdentifier.call(this)
    const block = parseBlock.call(this, "Declare")
    return new ClassStatement(className, block, startMatch.span.copy().expandEnd(block.span))
}
import parseExpression from "@front/parser/expressions/ParseExpression";
import WhileStatement from "@nodes/statement/WhileStatement";
import parseBlock from "@front/parser/misc/ParseBlock";
import Parser from "@front/parser/Parser";
import Block from "@nodes/Block";
import Tag from "@shared/Tag";

export default function parseWhileStatement(this: Parser): WhileStatement {
    const startMatch = this.match(Tag.While)

    this.match(Tag.OpenParenthesis)
    const condition = parseExpression.call(this)

    this.match(Tag.CloseParenthesis)
    const block = parseBlock.call(this)

    let fallbackBlock: Block | undefined = undefined

    if (this.accept(Tag.Else)) {
        this.match(Tag.Else)
        fallbackBlock = parseBlock.call(this)
    }

    return new WhileStatement(condition, fallbackBlock, block, startMatch.span.copy().expandEnd(this.span))
}
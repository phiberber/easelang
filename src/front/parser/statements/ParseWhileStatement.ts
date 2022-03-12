import Parser from "../Parser";
import {WhileStatement} from "../../../shared/nodes/statement/WhileStatement";
import {parseExpression} from "../expressions/ParseExpression";
import {parseBlock} from "../misc/ParseBlock";
import Tag from "../../../shared/Tag";
import Block from "../../../shared/nodes/Block";

export function parseWhileStatement(this: Parser): WhileStatement {
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
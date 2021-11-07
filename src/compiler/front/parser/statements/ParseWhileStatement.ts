import Parser from "../Parser";
import {WhileStatement} from "../../../full/nodes/statement/WhileStatement";
import Tag from "../../lexer/Tag";
import {parseExpression} from "../expressions/ParseExpression";
import Block from "../../../full/nodes/Block";
import {parseBlock} from "../misc/ParseBlock";

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
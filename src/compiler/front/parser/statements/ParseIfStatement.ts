import Parser from "../Parser";
import {IfStatement} from "../../../full/nodes/statement/IfStatement";
import Tag from "../../lexer/Tag";
import {parseExpression} from "../expressions/ParseExpression";
import {parseBlock} from "../misc/ParseBlock";

export function parseIfStatement(this: Parser): IfStatement {
    const startMatch = this.match(Tag.If)
    const elseStatements = []
    this.match(Tag.OpenParenthesis)
    const condition = parseExpression.call(this)
    this.match(Tag.CloseParenthesis)
    const block = parseBlock.call(this)
    while (this.accept(Tag.Else)) {
        const elseMatch = this.match(Tag.Else)
        if (this.accept(Tag.If)) {
            const fallbackNode = this.match(Tag.If)
            this.match(Tag.OpenParenthesis)
            const fallbackCondition = parseExpression.call(this)
            this.match(Tag.CloseParenthesis)
            const fallbackBlock = parseBlock.call(this)
            elseStatements.push(new IfStatement(fallbackCondition, [], fallbackBlock, fallbackNode.span))
        } else {
            const fallbackBlock = parseBlock.call(this)
            elseStatements.push(new IfStatement(undefined, [], fallbackBlock, elseMatch.span))
        }
    }
    const ifSpan = startMatch.span.copy().expandEnd(this.span)
    return new IfStatement(condition, elseStatements, block, ifSpan)
}
import {ConditionalExpression} from "@nodes/statement/ConditionalExpression";
import {parseBlock} from "@front/parser/misc/ParseBlock";
import {parseExpression} from "@front/parser/expressions/ParseExpression";
import {Parser} from "@front/parser/Parser";
import {Tag} from "@shared/Tag";

export function parseConditionalExpression(this: Parser): ConditionalExpression {
    const startMatch = this.match(Tag.If)
    const fallbackExpressions = []

    this.skip(Tag.OpenParenthesis)
    const condition = parseExpression.call(this)

    if(condition == undefined) this.raise("Expected expression after if")

    this.skip(Tag.CloseParenthesis)
    const block = parseBlock.call(this)

    while (this.accept(Tag.Else)) {
        const elseMatch = this.match(Tag.Else)
        if (this.accept(Tag.If)) {
            const fallbackNode = this.match(Tag.If)
            this.skip(Tag.OpenParenthesis)
            const fallbackCondition = parseExpression.call(this)
            this.skip(Tag.CloseParenthesis)
            const fallbackBlock = parseBlock.call(this)
            fallbackExpressions.push(new ConditionalExpression(fallbackCondition, [], fallbackBlock, fallbackNode.span))
        } else {
            const fallbackBlock = parseBlock.call(this)
            fallbackExpressions.push(new ConditionalExpression(undefined, [], fallbackBlock, elseMatch.span))
        }
    }


    const conditionalSpan = startMatch.span.copy().expandEnd(this.span)
    return new ConditionalExpression(condition, fallbackExpressions, block, conditionalSpan)
}
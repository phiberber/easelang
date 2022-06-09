import {ConditionalExpression} from "@/lang/shared/nodes/statement/ConditionalExpression";
import {parseBlock} from "@/lang/front/parser/misc/ParseBlock";
import {Parser} from "@/lang/front/parser/Parser";
import {Tag} from "@/lang/shared/Tag";
import {
    parseParenthesisExpression,
} from "@/lang/front/parser/expressions/ParseParenthesisExpression";

export function parseConditionalExpression(this: Parser): ConditionalExpression {
    const match = this.match(Tag.If)
    const test = parseParenthesisExpression.call(this) ?? this.raise("Expected condition after if")
    const body = parseBlock.call(this)
    let tailConditional = undefined

    while (this.accept(Tag.Else)) {
        const alternateMatch = this.match(Tag.Else)
        const alternateTest = this.skip(Tag.If) ? parseParenthesisExpression.call(this) : undefined
        const alternateBody = parseBlock.call(this)
        const alternateSpan = alternateMatch.span.expand(this.span)
        const alternateExpression = new ConditionalExpression(alternateTest, undefined, alternateBody, alternateSpan)
        tailConditional && (tailConditional.alternate = alternateExpression)
        tailConditional = alternateExpression
    }

    const expressionSpan = match.span.expand(this.span)
    return new ConditionalExpression(test, tailConditional, body, expressionSpan)
}
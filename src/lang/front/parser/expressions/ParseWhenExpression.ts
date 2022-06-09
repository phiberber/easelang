import {WhenCase, WhenExpression} from "@/lang/shared/nodes/expression/WhenExpression";
import {Parser} from "@/lang/front/parser/Parser";
import {Tag} from "@/lang/shared/Tag";
import {parseExpression} from "@/lang/front/parser/expressions/ParseExpression";
import {parseBlock} from "@/lang/front/parser/misc/ParseBlock";
import {parseParenthesisExpression} from "@/lang/front/parser/expressions/ParseParenthesisExpression";

export function parseWhenExpression(this: Parser): WhenExpression | undefined {
    const startPoint = this.match(Tag.When)
    const discriminant = parseParenthesisExpression.call(this) ?? this.raise("Expected a discriminant in when expression")
    this.match(Tag.OpenBraces)
    const cases = []
    while (!this.accept(Tag.CloseBraces)) {
        const startPoint = this.span
        const caseCondition = this.skip(Tag.Else) ? undefined : parseExpression.call(this)
        this.match(Tag.Arrow)
        const caseContent = this.accept(Tag.OpenBraces) ? parseBlock.call(this) : parseExpression.call(this)
        const caseSpan = startPoint.expand(this.span)
        if (!caseContent) this.raise("Expected a case content in when expression")
        cases.push(new WhenCase(caseCondition, caseContent!, caseSpan))
    }
    this.match(Tag.CloseBraces)
    const whenSpan = startPoint.span.expand(this.span)
    return new WhenExpression(discriminant, cases, whenSpan)
}


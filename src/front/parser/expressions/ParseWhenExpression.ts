import {WhenCase, WhenExpression} from "@nodes/expression/WhenExpression";
import {Parser} from "@front/parser/Parser";
import {Tag} from "@shared/Tag";
import {parseExpression} from "@front/parser/expressions/ParseExpression";
import {parseBlock} from "@front/parser/misc/ParseBlock";

export function parseWhenExpression(this: Parser): WhenExpression | undefined {
    const startPoint = this.match(Tag.When)
    this.skip(Tag.OpenParenthesis)
    const discriminant = parseExpression.call(this) ?? this.raise("Expected a discriminant in when expression")
    this.skip(Tag.CloseParenthesis)
    this.match(Tag.OpenBraces)
    const cases = []
    while (!this.accept(Tag.CloseBraces)) {
        const startPoint = this.span
        const caseCondition = this.skip(Tag.Else) ? undefined : parseExpression.call(this)
        this.match(Tag.Arrow)
        const caseContent = this.accept(Tag.OpenBraces) ? parseBlock.call(this) : parseExpression.call(this)
        const caseSpan = startPoint.copy().expandEnd(this.span)
        if (!caseContent) this.raise("Expected a case content in when expression")
        cases.push(new WhenCase(caseCondition, caseContent!, caseSpan))
    }
    this.match(Tag.CloseBraces)
    const whenSpan = startPoint.span.copy().expandEnd(this.span)
    return new WhenExpression(discriminant, cases, whenSpan)
}


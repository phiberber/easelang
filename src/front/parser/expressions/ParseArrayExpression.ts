import {Tag} from "@shared/Tag";
import {parseExpression} from "@front/parser/expressions/ParseExpression";
import {Parser} from "@front/parser/Parser";
import {ArrayExpression} from "@nodes/expression/ArrayExpression";
import {Expression} from "@nodes/expression/Expression";

export function parseArrayExpression(this: Parser): ArrayExpression {
    const startPoint = this.match(Tag.OpenBrackets)
    const values: Expression[] = []
    while(!this.skip(Tag.CloseBrackets)) {
        const expression = parseExpression.call(this)
        if(!expression) break
        values.push(expression)
        this.skip(Tag.Comma)
    }
    const arraySpan = startPoint.span.copy().expandEnd(this.span)
    return new ArrayExpression(values, arraySpan)
}
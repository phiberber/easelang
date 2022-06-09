import {Tag} from "@/lang/shared/Tag";
import {parseExpression} from "@/lang/front/parser/expressions/ParseExpression";
import {Parser} from "@/lang/front/parser/Parser";
import {ArrayExpression} from "@/lang/shared/nodes/expression/ArrayExpression";
import {Expression} from "@/lang/shared/nodes/expression/Expression";

export function parseArrayExpression(this: Parser): ArrayExpression {
    const startPoint = this.match(Tag.OpenBrackets)
    const values: Expression[] = []
    while(!this.skip(Tag.CloseBrackets)) {
        const expression = parseExpression.call(this)
        if(!expression) break
        values.push(expression)
        this.skip(Tag.Comma)
    }
    const arraySpan = startPoint.span.expand(this.span)
    return new ArrayExpression(values, arraySpan)
}
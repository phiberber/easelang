import {Parser} from "@/lang/front/parser/Parser";
import {Tag} from "@/lang/shared/Tag";
import {parseBlock} from "@/lang/front/parser/misc/ParseBlock";
import {parseIdentifier} from "@/lang/front/parser/expressions/ParseIdentifier";
import {ForExpression} from "@/lang/shared/nodes/expression/ForExpression";
import {parseExpression} from "@/lang/front/parser/expressions/ParseExpression";

export function parseForExpression(this: Parser): ForExpression {
    const startPoint = this.match(Tag.For)
    this.skip(Tag.OpenParenthesis)
    const left = parseIdentifier.call(this) // @TODO Deconstructing
    this.match(Tag.In)
    const right = parseExpression.call(this) ?? this.raise("Expected expression after 'in'")
    this.skip(Tag.CloseParenthesis)
    const body = parseBlock.call(this)
    const forSpan = startPoint.span.expand(body.span)
    return new ForExpression(left, right, body, forSpan)
}


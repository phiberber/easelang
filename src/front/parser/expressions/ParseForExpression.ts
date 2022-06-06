import {Parser} from "@front/parser/Parser";
import {Tag} from "@shared/Tag";
import {parseBlock} from "@front/parser/misc/ParseBlock";
import {parseIdentifier} from "@front/parser/expressions/ParseIdentifier";
import {ForExpression} from "@nodes/expression/ForExpression";
import {parseExpression} from "@front/parser/expressions/ParseExpression";

export function parseForExpression(this: Parser): ForExpression {
    const startPoint = this.match(Tag.For)
    this.skip(Tag.OpenParenthesis)
    const left = parseIdentifier.call(this) // @TODO Deconstructing
    this.match(Tag.In)
    const right = parseExpression.call(this) ?? this.raise("Expected expression after 'in'")
    this.skip(Tag.CloseParenthesis)
    const body = parseBlock.call(this)
    const forSpan = startPoint.span.copy().expandEnd(body.span)
    return new ForExpression(left, right, body, forSpan)
}


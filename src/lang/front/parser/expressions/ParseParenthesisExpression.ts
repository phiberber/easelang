import {ParenthesisExpression} from "@/lang/shared/Type";
import {parseExpression} from "@/lang/front/parser/expressions/ParseExpression";
import {Parser} from "@/lang/front/parser/Parser";
import {Tag} from "@/lang/shared/Tag";

export function parsePossibleParenthesisExpression(this: Parser): ParenthesisExpression {
    let node
    this.skip(Tag.OpenParenthesis)
    node = parseExpression.call(this)
    this.skip(Tag.CloseParenthesis)
    return node
}

export function parseParenthesisExpression(this: Parser): ParenthesisExpression {
    let node
    this.match(Tag.OpenParenthesis)
    node = parseExpression.call(this)
    this.match(Tag.CloseParenthesis)
    return node
}
import {ParenthesisExpression} from "@shared/Type";
import {parseExpression} from "@front/parser/expressions/ParseExpression";
import {Parser} from "@front/parser/Parser";
import {Tag} from "@shared/Tag";

export function parseParenthesisExpression(this: Parser): ParenthesisExpression {
    let node
    this.match(Tag.OpenParenthesis)
    node = parseExpression.call(this)
    this.match(Tag.CloseParenthesis)
    return node
}
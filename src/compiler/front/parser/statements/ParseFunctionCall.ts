import Parser from "../Parser";
import {FunctionCall} from "../../../full/nodes/call/FunctionCall";
import {ParserNode} from "../../../full/nodes/ParserNode";
import Tag from "../../lexer/Tag";
import {parseExpression} from "../expressions/ParseExpression";

export function parseFunctionCall(this: Parser): FunctionCall {
    const parameters: ParserNode[] = []
    const functionName = this.match(Tag.Identifier)

    this.match(Tag.OpenParenthesis)

    while (!this.accept(Tag.CloseParenthesis)) {
        this.skip(Tag.Comma)
        const parameterValue = parseExpression.call(this)

        if (!parameterValue) break
        parameters.push(parameterValue)
    }

    this.match(Tag.CloseParenthesis)

    const callSpan = functionName.span.copy().expandEnd(this.span)
    return new FunctionCall(functionName, parameters, callSpan)
}
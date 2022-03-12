import parseExpression from "@front/parser/expressions/ParseExpression";
import FunctionCall from "@nodes/call/FunctionCall";
import ParserNode from "@nodes/ParserNode";
import Parser from "@front/parser/Parser";
import Tag from "@shared/Tag";

export default function parseFunctionCall(this: Parser): FunctionCall {
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
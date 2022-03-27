import CallExpression, {CalleeCandidate} from "@nodes/expression/CallExpression";
import parseExpression from "@front/parser/expressions/ParseExpression";
import parseIdentifier from "@front/parser/expressions/ParseIdentifier";
import Parser from "@front/parser/Parser";
import ParserNode from "@nodes/ParserNode";
import Tag from "@shared/Tag";

export default function parseCallExpression(this: Parser, callee: CalleeCandidate = parseIdentifier.call(this)): CallExpression {
    const parameters: ParserNode[] = []
    this.match(Tag.OpenParenthesis)
    while (!this.accept(Tag.CloseParenthesis)) {
        this.skip(Tag.Comma)
        const parameterValue = parseExpression.call(this)
        if (parameterValue) parameters.push(parameterValue)
    }
    this.match(Tag.CloseParenthesis)
    const functionSpan = callee.span.copy().expandEnd(this.span)
    return new CallExpression(callee, parameters, functionSpan)
}
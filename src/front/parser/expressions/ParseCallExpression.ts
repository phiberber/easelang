import {CallExpression, CalleeCandidate} from "@nodes/expression/CallExpression";
import {parseExpression} from "@front/parser/expressions/ParseExpression";
import {parseIdentifier} from "@front/parser/expressions/ParseIdentifier";
import {ParserNode} from "@nodes/ParserNode";
import {Parser} from "@front/parser/Parser";
import {Tag} from "@shared/Tag";
import {parseAnonymousFunctionDeclaration} from "@front/parser/declarations/ParseAnonymousFunctionDeclaration";

export function parseCallExpression(this: Parser, callee: CalleeCandidate = parseIdentifier.call(this)): CallExpression {
    const parameters: ParserNode[] = []
    const parenthesis = this.skip(Tag.OpenParenthesis)
    let argumentCount = 0
    while (parenthesis && !this.accept(Tag.CloseParenthesis)) {
        if(argumentCount != 0) this.match(Tag.Comma)
        const parameterValue = parseExpression.call(this)
        if (parameterValue) parameters.push(parameterValue)
        argumentCount++
    }
    this.skip(Tag.CloseParenthesis)
    if(this.accept(Tag.OpenBraces)) {
        const anonymousDeclaration = parseAnonymousFunctionDeclaration.call(this)
        parameters.push(anonymousDeclaration)
    }
    const functionSpan = callee.span.copy().expandEnd(this.span)
    return new CallExpression(callee, parameters, functionSpan)
}
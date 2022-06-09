import {CallExpression, CalleeCandidate} from "@/lang/shared/nodes/expression/CallExpression";
import {parseExpression} from "@/lang/front/parser/expressions/ParseExpression";
import {parseIdentifier} from "@/lang/front/parser/expressions/ParseIdentifier";
import {BaseNode} from "@/lang/shared/nodes/BaseNode";
import {Parser} from "@/lang/front/parser/Parser";
import {Tag} from "@/lang/shared/Tag";
import {parseAnonymousFunctionExpression} from "@/lang/front/parser/declarations/ParseAnonymousFunctionExpression";

export function parseCallExpression(this: Parser, callee: CalleeCandidate = parseIdentifier.call(this)): CallExpression {
    const parameters: BaseNode[] = []
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
        const anonymousDeclaration = parseAnonymousFunctionExpression.call(this)
        parameters.push(anonymousDeclaration)
    }
    const functionSpan = callee.span.expand(this.span)
    return new CallExpression(callee, parameters, functionSpan)
}
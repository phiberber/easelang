import {BlockExpression} from "@nodes/expression/BlockExpression";
import {FunctionExpression, ParameterStatement} from "@nodes/declare/FunctionExpression";
import {IdentifierExpression} from "@nodes/expression/IdentifierExpression";
import {parseBlock} from "@front/parser/misc/ParseBlock";
import {parseIdentifier} from "@front/parser/expressions/ParseIdentifier";
import {Parser} from "@front/parser/Parser";
import {Tag} from "@shared/Tag";
import {Span} from "@shared/Span";

export function parseAnonymousFunctionDeclaration(this: Parser): FunctionExpression {
    const parameters: ParameterStatement[] = []
    const startMatch = this.match(Tag.OpenBraces)
    let block: BlockExpression
    let hasParenthesis = this.skip(Tag.OpenParenthesis)
    let hasParameters = Tag.Identifier && this.expect([Tag.Arrow, Tag.Comma])
    while (
        hasParameters && (
            (hasParenthesis && !this.skip(Tag.CloseParenthesis)) ||
            (!hasParenthesis && !this.skip(Tag.Arrow))
        )) {
        this.skip(Tag.Comma)
        if(!this.accept(Tag.Identifier)) break
        const parameterIdentifier = parseIdentifier.call(this)
        const parameterSpan = parameterIdentifier.span.copy().expandEnd(this.span)
        parameters.push(new ParameterStatement(parameterIdentifier, undefined, false, parameterSpan))
    }

    if(parameters.length === 0) {
        const identifier = new IdentifierExpression("it", Span.empty)
        parameters.push(new ParameterStatement(identifier, undefined, true, Span.empty))
    }

    block = parseBlock.call(this)

    const functionSpan = startMatch.span.copy().expandEnd(this.span)
    return new FunctionExpression(IdentifierExpression.empty, parameters, block, functionSpan)
}
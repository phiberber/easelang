import {BlockExpression} from "@/lang/shared/nodes/expression/BlockExpression";
import {FunctionExpression, ParameterStatement} from "@/lang/shared/nodes/expression/FunctionExpression";
import {IdentifierLiteral} from "@/lang/shared/nodes/literal/IdentifierLiteral";
import {parseBlock} from "@/lang/front/parser/misc/ParseBlock";
import {parseIdentifier} from "@/lang/front/parser/expressions/ParseIdentifier";
import {Parser} from "@/lang/front/parser/Parser";
import {Tag} from "@/lang/shared/Tag";
import {Span} from "@/lang/shared/Span";

export function parseAnonymousFunctionExpression(this: Parser): FunctionExpression {
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
        if (!this.accept(Tag.Identifier)) break
        const parameterIdentifier = parseIdentifier.call(this)
        const parameterSpan = parameterIdentifier.span.expand(this.span)
        parameters.push(new ParameterStatement(parameterIdentifier, undefined, false, parameterSpan))
    }

    if (parameters.length === 0) {
        const identifier = new IdentifierLiteral("it", Span.empty)
        parameters.push(new ParameterStatement(identifier, undefined, true, Span.empty))
    }

    block = parseBlock.call(this, {startMatch})

    const functionSpan = startMatch.span.expand(this.span)
    return new FunctionExpression(IdentifierLiteral.empty, parameters, block, functionSpan)
}
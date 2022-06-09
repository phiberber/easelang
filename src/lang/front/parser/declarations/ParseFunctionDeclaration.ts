import {BlockExpression} from "@/lang/shared/nodes/expression/BlockExpression";
import {FunctionExpression, ParameterStatement} from "@/lang/shared/nodes/expression/FunctionExpression";
import {IdentifierLiteral} from "@/lang/shared/nodes/literal/IdentifierLiteral";
import {parseBlock} from "@/lang/front/parser/misc/ParseBlock";
import {parseIdentifier} from "@/lang/front/parser/expressions/ParseIdentifier";
import {Parser} from "@/lang/front/parser/Parser";
import {parseSimpleExpression} from "@/lang/front/parser/expressions/ParseSimpleExpression";
import {Tag} from "@/lang/shared/Tag";

export function parseFunctionDeclaration(this: Parser): FunctionExpression {

    const parameters: ParameterStatement[] = []
    const startMatch = this.accept(Tag.Function) ? this.match(Tag.Function) : this.look
    const identifier = this.accept(Tag.Identifier) ? parseIdentifier.call(this) : IdentifierLiteral.empty
    let block: BlockExpression = BlockExpression.empty
    let dynamic = false

    this.match(Tag.OpenParenthesis)

    while (!this.accept(Tag.CloseParenthesis)) {
        this.skip(Tag.Comma)
        if(!this.accept(Tag.Identifier)) break

        const parameterIdentifier = parseIdentifier.call(this)
        let parameterDefault = undefined
        let parameterOptional = false

        if(this.skip(Tag.Interrogation)) {
            dynamic = true
            parameterOptional = true
        }

        if(this.skip(Tag.Assign)) {
            dynamic = true
            parameterOptional = true
            parameterDefault = parseSimpleExpression.call(this)
            parameterDefault || this.raise("Expected parameter default value to be a simple expression.")
        }

        if(dynamic && !parameterOptional) this.raise(`A required parameter can not be placed after an optional parameter.`)

        const parameterSpan = parameterIdentifier.span.expand(this.span)
        parameters.push(new ParameterStatement(parameterIdentifier, parameterDefault, parameterOptional, parameterSpan))
    }

    this.match(Tag.CloseParenthesis)

    if (this.accept([Tag.Colon, Tag.OpenBraces])) block = parseBlock.call(this)

    const functionSpan = startMatch.span.expand(this.span)
    return new FunctionExpression(identifier, parameters, block, functionSpan)
}
import {BlockExpression} from "@nodes/expression/BlockExpression";
import {FunctionExpression, ParameterStatement} from "@nodes/declare/FunctionExpression";
import {IdentifierExpression} from "@nodes/expression/IdentifierExpression";
import {parseBlock} from "@front/parser/misc/ParseBlock";
import {parseIdentifier} from "@front/parser/expressions/ParseIdentifier";
import {Parser} from "@front/parser/Parser";
import {parseSimpleExpression} from "@front/parser/expressions/ParseSimpleExpression";
import {Tag} from "@shared/Tag";

export function parseFunctionDeclaration(this: Parser): FunctionExpression {

    const parameters: ParameterStatement[] = []
    const startMatch = this.accept(Tag.Function) ? this.match(Tag.Function) : this.look
    const identifier = this.accept(Tag.Identifier) ? parseIdentifier.call(this) : IdentifierExpression.empty
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
            parameterDefault = parseSimpleExpression.call(this)
            parameterDefault || this.raise("Expected parameter default value to be a simple expression.")
        }

        if(dynamic && !parameterOptional) this.raise(`A required parameter can not be placed after an optional parameter.`)

        const parameterSpan = parameterIdentifier.span.copy().expandEnd(this.span)
        parameters.push(new ParameterStatement(parameterIdentifier, parameterDefault, parameterOptional, parameterSpan))
    }

    this.match(Tag.CloseParenthesis)

    if (this.accept(Tag.Colon)) block = parseBlock.call(this)

    const functionSpan = startMatch.span.copy().expandEnd(this.span)
    return new FunctionExpression(identifier, parameters, block, functionSpan)
}
import {parseSimpleExpression} from "@front/parser/expressions/ParseExpression";
import {DeclareFunction, DeclareParameter} from "@nodes/declare/DeclareFunction";
import parseBlock from "@front/parser/misc/ParseBlock";
import Tag, {Modifiers} from "@shared/Tag";
import Parser from "@front/parser/Parser";
import Block from "@nodes/Block";

export default function parseFunctionDeclaration(this: Parser, modifiers: typeof Modifiers): DeclareFunction {

    const parameters: DeclareParameter[] = []
    const startMatch = this.match(Tag.Function)
    const functionName = this.match(Tag.Identifier)
    let block: Block
    let dynamic = false

    this.match(Tag.OpenParenthesis)

    while (!this.accept(Tag.CloseParenthesis)) {
        this.skip(Tag.Comma)
        const parameterIdentifier = this.skip(Tag.Identifier)
        if (!parameterIdentifier) return
        let parameterDefault = undefined
        let parameterOptional = false
        if (this.skip(Tag.Interrogation)) {
            dynamic = true
            parameterOptional = true
        }
        if (this.skip(Tag.Assign)) {
            parameterDefault = parseSimpleExpression.call(this)
            parameterDefault || this.raise("Expected parameter default value to be a simple expression.")
        }
        if(dynamic && !parameterOptional)
            this.raise("A required parameter can not be placed after an optional parameter.")
        parameters.push(new DeclareParameter(parameterIdentifier, undefined, parameterDefault, parameterOptional, parameterIdentifier.span.copy().expandEnd(this.span)))
    }

    this.match(Tag.CloseParenthesis)

    if (this.accept(Tag.Colon)) {
        block = parseBlock.call(this)
    }

    return new DeclareFunction(modifiers, functionName, parameters, undefined, block, startMatch.span.copy().expandEnd(this.span))
}
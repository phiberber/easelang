import Parser from "../Parser";
import Tag, {Modifiers} from "../../lexer/Tag";
import {DeclareFunction, DeclareParameter} from "../../../full/nodes/declare/DeclareFunction";
import Block from "../../../full/nodes/Block";
import {parseSimpleExpression} from "../expressions/ParseExpression";
import {parseBlock} from "../misc/ParseBlock";

export function parseFunctionDeclaration(this: Parser, modifiers: typeof Modifiers): DeclareFunction {

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
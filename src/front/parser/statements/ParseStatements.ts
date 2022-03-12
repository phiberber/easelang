import Parser from "../Parser";
import {ParserNode} from "../../../shared/nodes/ParserNode";
import {parseVariableDeclaration} from "../declarations/ParseVariableDeclaration";
import {parseExpression} from "../expressions/ParseExpression";
import {parseWhileStatement} from "./ParseWhileStatement";
import {parseIfStatement} from "./ParseIfStatement";
import {parseAssignStatement} from "./ParseAssignStatement";
import {parseClassDeclaration} from "../declarations/ParseClassDeclaration";
import {parseFunctionDeclaration} from "../declarations/ParseFunctionDeclaration";
import {parseFunctionCall} from "./ParseFunctionCall";
import Tag, {Modifiers} from "../../../shared/Tag";

export function parseStatement(this: Parser): ParserNode {

    this.skip(Tag.LineBreak)

    const modifiers = []
    while(this.accept(Modifiers)) modifiers.push(this.match(Modifiers).tag)

    if (this.expect(Tag.Identifier)) {

        if (this.accept(Tag.Class)) {
            // Declare Class
            return parseClassDeclaration.call(this, modifiers)
        }

        if (this.accept([Tag.Variable, Tag.Value, Tag.Constant])) {
            // Declare Variable
            return parseVariableDeclaration.call(this, modifiers)
        }

        if (this.accept(Tag.Function)) {
            // Declare Function
            return parseFunctionDeclaration.call(this, modifiers)
        }

    }

    if (this.accept(Tag.Identifier)) {

        if (this.expect(Tag.OpenParenthesis)) {
            // Execute Function
            return parseFunctionCall.call(this)
        }

        if (this.expect(Tag.Assign)) {
            // Assign Value to an existing Variable
            return parseAssignStatement.call(this)
        }

    }

    if (this.accept(Tag.If)) {
        // Execute an If Statement
        return parseIfStatement.call(this)
    }

    if (this.accept(Tag.While)) {
        // Execute a While Statement
        return parseWhileStatement.call(this)
    }

    return parseExpression.call(this)

}


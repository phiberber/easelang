import Parser from "@front/parser/Parser";
import ParserNode from "@nodes/ParserNode";
import Tag, {Modifiers} from "@shared/Tag";
import parseClassDeclaration from "@front/parser/declarations/ParseClassDeclaration";
import parseVariableDeclaration from "@front/parser/declarations/ParseVariableDeclaration";
import parseFunctionDeclaration from "@front/parser/declarations/ParseFunctionDeclaration";
import parseFunctionCall from "@front/parser/statements/ParseFunctionCall";
import parseAssignStatement from "@front/parser/statements/ParseAssignStatement";
import parseConditionalStatement from "@front/parser/statements/ParseConditionalStatement";
import parseWhileStatement from "@front/parser/statements/ParseWhileStatement";
import parseExpression from "@front/parser/expressions/ParseExpression";

export default function parseStatement(this: Parser): ParserNode {

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
        return parseConditionalStatement.call(this)
    }

    if (this.accept(Tag.While)) {
        // Execute a While Statement
        return parseWhileStatement.call(this)
    }

    return parseExpression.call(this)

}


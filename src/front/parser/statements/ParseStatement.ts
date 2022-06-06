import {parseClassDeclaration} from "@front/parser/declarations/ParseClassDeclaration";
import {parseExpression} from "@front/parser/expressions/ParseExpression";
import {parseFunctionDeclaration} from "@front/parser/declarations/ParseFunctionDeclaration";
import {parseImport} from "@front/parser/statements/ParseImport";
import {ParserNode} from "@nodes/ParserNode";
import {Parser} from "@front/parser/Parser";
import {parseVariableDeclaration} from "@front/parser/declarations/ParseVariableDeclaration";
import {parseWhileStatement} from "@front/parser/statements/ParseWhileStatement";
import {Tag} from "@shared/Tag";

export function parseStatement(this: Parser): ParserNode | undefined {

    this.skip(Tag.LineBreak)

    if (this.expect(Tag.Identifier)) {

        if (this.accept(Tag.Class)) {
            // Declare Class
            return parseClassDeclaration.call(this)
        }

        if (this.accept([Tag.Variable, Tag.Value, Tag.Constant])) {
            // Declare Variable
            return parseVariableDeclaration.call(this)
        }

        if (this.accept(Tag.Function)) {
            // Declare Function
            return parseFunctionDeclaration.call(this)
        }

    }

    if (this.accept(Tag.Import)) {
        // Import something from a module
        return parseImport.call(this)
    }

    if (this.accept(Tag.While)) {
        // Execute a While Statement
        return parseWhileStatement.call(this)
    }

    return parseExpression.call(this)

}


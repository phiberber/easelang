import {parseClassDeclaration} from "@/lang/front/parser/declarations/ParseClassDeclaration";
import {parseExpression} from "@/lang/front/parser/expressions/ParseExpression";
import {parseFunctionDeclaration} from "@/lang/front/parser/declarations/ParseFunctionDeclaration";
import {parseImport} from "@/lang/front/parser/statements/ParseImport";
import {BaseNode} from "@/lang/shared/nodes/BaseNode";
import {Parser} from "@/lang/front/parser/Parser";
import {parseVariableDeclaration} from "@/lang/front/parser/declarations/ParseVariableDeclaration";
import {parseWhileStatement} from "@/lang/front/parser/statements/ParseWhileStatement";
import {Tag} from "@/lang/shared/Tag";

export function parseStatement(this: Parser): BaseNode | undefined {

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


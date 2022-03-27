import Expression from "@nodes/expression/Expression";
import parseExpression from "@front/parser/expressions/ParseExpression";
import parseIdentifier from "@front/parser/expressions/ParseIdentifier";
import Parser from "@front/parser/Parser";
import Tag from "@shared/Tag";
import VariableStatement from "@nodes/declare/VariableStatement";

export default function parseVariableDeclaration(this: Parser): VariableStatement {

    const variableType = this.match([Tag.Variable, Tag.Value, Tag.Constant])
    const variableName = parseIdentifier.call(this)

    let variableExpression: Expression | undefined = undefined

    if (this.accept(Tag.Colon)) {
        // @TODO Implement Typing
    }

    if (this.accept(Tag.Assign)) {
        this.match(Tag.Assign)
        variableExpression = parseExpression.call(this)
        if (!variableExpression) this.raise("Expression expected after variable declaration.")
    }

    return new VariableStatement(variableType.tag, variableName, variableExpression || Expression.empty, variableName.span.copy().expandEnd(this.span))
}


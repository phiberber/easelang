/**
 * This is not separated in files because it would make it unreadable.
 */
import Expression from "@nodes/expression/Expression";
import parseAssignExpression from "@front/parser/expressions/ParseAssignExpression";
import parseBooleanExpression from "@front/parser/expressions/ParseBooleanExpression";
import Parser from "@front/parser/Parser";
import Tag, {PostUnaryTags, PreUnaryTags} from "@shared/Tag";
import parseFunctionDeclaration from "@front/parser/declarations/ParseFunctionDeclaration";
import UnaryExpression from "@nodes/expression/UnaryExpression";

export default function parseExpression(this: Parser): Expression | undefined {

    let expression: Expression | undefined;
    let prefixes = []

    while(this.accept(PreUnaryTags)) prefixes.push(this.match(PreUnaryTags))

    if (this.accept(Tag.OpenParenthesis) && (this.expect([Tag.Identifier, Tag.CloseParenthesis]))) {
        // Create lambda expression
        return parseFunctionDeclaration.call(this)
    }

    if (this.accept(Tag.Identifier) && this.expect(Tag.Assign)) {
        // Assign Value to an existing Variable
        return parseAssignExpression.call(this)
    }

    expression = parseBooleanExpression.call(this)

    if (expression) {
        for(const prefix of prefixes) expression = new UnaryExpression(prefix.tag, expression, true, prefix.span.expandEnd(expression.span))
        if (expression && this.accept(PostUnaryTags)) {
            const match = this.match(PostUnaryTags)
            expression = new UnaryExpression(match.tag, expression, false, expression.span.copy().expandEnd(match.span))
        }
    } else if(prefixes.length) this.raise("Expected expression after unary prefixes")

    return expression
}


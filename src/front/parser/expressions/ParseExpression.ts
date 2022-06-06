import {Expression} from "@nodes/expression/Expression";
import {parseAssignExpression} from "@front/parser/expressions/ParseAssignExpression";
import {parseBooleanExpression} from "@front/parser/expressions/ParseBooleanExpression";
import {Parser} from "@front/parser/Parser";
import {Tag, PostUnaryTags, PreUnaryTags, AssignmentTags} from "@shared/Tag";
import {UnaryExpression} from "@nodes/expression/UnaryExpression";
import {parseAnonymousFunctionDeclaration} from "@front/parser/declarations/ParseAnonymousFunctionDeclaration";
import {parseWhenExpression} from "@front/parser/expressions/ParseWhenExpression";
import {parseForExpression} from "@front/parser/expressions/ParseForExpression";
import {IdentifierExpression} from "@nodes/expression/IdentifierExpression";
import {MemberExpression} from "@nodes/expression/MemberExpression";
import {parseConditionalExpression} from "@front/parser/statements/ParseConditionalExpression";

export function parseExpression(this: Parser): Expression | undefined {

    let expression: Expression | undefined;
    let prefixes = []

    while (this.accept(PreUnaryTags)) {
        prefixes.push(this.match(PreUnaryTags))
    }

    if (this.accept(Tag.OpenBraces)) {
        expression = parseAnonymousFunctionDeclaration.call(this)
    } else if (this.accept(Tag.When)) {
        expression = parseWhenExpression.call(this)
    } else if (this.accept(Tag.For)) {
        expression = parseForExpression.call(this)
    } if (this.accept(Tag.If)) {
        expression = parseConditionalExpression.call(this)
    } else {
        expression = parseBooleanExpression.call(this)
    }

    if (expression && this.accept(AssignmentTags) && (expression instanceof IdentifierExpression || expression instanceof MemberExpression)) {
        expression = parseAssignExpression.call(this, expression!)
    }

    if (expression != null) {
        for (const prefix of prefixes) expression = new UnaryExpression(prefix.tag, expression!, true, prefix.span.expandEnd(expression!.span))
        if (this.accept(PostUnaryTags)) {
            const match = this.match(PostUnaryTags)
            const unarySpan = expression.span.copy().expandEnd(match.span)
            expression = new UnaryExpression(match.tag, expression, false, unarySpan)
        }
    } else if (prefixes.length) this.raise("Expected expression after unary prefixes")

    return expression
}


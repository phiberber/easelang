import {Expression} from "@/lang/shared/nodes/expression/Expression";
import {parseAssignExpression} from "@/lang/front/parser/expressions/ParseAssignExpression";
import {parseBooleanExpression} from "@/lang/front/parser/expressions/ParseBooleanExpression";
import {Parser} from "@/lang/front/parser/Parser";
import {Tag, UnaryTags, AssignmentTags, UpdateTags} from "@/lang/shared/Tag";
import {UnaryExpression} from "@/lang/shared/nodes/expression/UnaryExpression";
import {parseAnonymousFunctionExpression} from "@/lang/front/parser/declarations/ParseAnonymousFunctionExpression";
import {parseWhenExpression} from "@/lang/front/parser/expressions/ParseWhenExpression";
import {parseForExpression} from "@/lang/front/parser/expressions/ParseForExpression";
import {IdentifierLiteral} from "@/lang/shared/nodes/literal/IdentifierLiteral";
import {MemberExpression} from "@/lang/shared/nodes/expression/MemberExpression";
import {parseConditionalExpression} from "@/lang/front/parser/statements/ParseConditionalExpression";
import {UpdateExpression} from "@/lang/shared/nodes/expression/UpdateExpression";

export function parseExpression(this: Parser): Expression | undefined {

    let expression: Expression | undefined;

    const preUnaryTokens = []
    const preUpdateTokens = []

    while (this.accept(UnaryTags)) preUnaryTokens.push(this.match(UnaryTags))
    while (this.accept(UpdateTags)) preUpdateTokens.push(this.match(UpdateTags))

    if (this.accept(Tag.OpenBraces)) {
        expression = parseAnonymousFunctionExpression.call(this)
    } else if (this.accept(Tag.When)) {
        expression = parseWhenExpression.call(this)
    } else if (this.accept(Tag.For)) {
        expression = parseForExpression.call(this)
    } else if (this.accept(Tag.If)) {
        expression = parseConditionalExpression.call(this)
    } else {
        expression = parseBooleanExpression.call(this)
    }

    if (expression !== undefined) {

        if (this.accept(AssignmentTags) && (expression instanceof IdentifierLiteral || expression instanceof MemberExpression))
            expression = parseAssignExpression.call(this, expression)

        for (const preUnary of preUnaryTokens)
            expression = new UnaryExpression(preUnary.tag, expression!, true, preUnary.span.expand(this.span))

        for (const preUpdate of preUpdateTokens)
            expression = new UpdateExpression(preUpdate.tag, expression!, true, preUpdate.span.expand(this.span))

        if (this.accept(UpdateTags)) {
            const match = this.match(UpdateTags)
            expression = new UpdateExpression(match.tag, expression!, false, match.span.expand(this.span))
        }

    } else if (preUnaryTokens.length) this.raise("Expected expression after unary prefixes")

    return expression
}


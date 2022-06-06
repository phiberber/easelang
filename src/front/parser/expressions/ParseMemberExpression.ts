import {Tag} from "@shared/Tag";
import {Parser} from "@front/parser/Parser";
import {parseIdentifier} from "@front/parser/expressions/ParseIdentifier";
import {MemberExpression} from "@nodes/expression/MemberExpression";
import {Expression} from "@nodes/expression/Expression";

export function parseMemberExpression(this: Parser, expression: Expression): MemberExpression | undefined {
    while (this.expect(Tag.Identifier) && this.accept([Tag.Dot, Tag.ChainDot])) {
        const startMatch = this.match([Tag.Dot, Tag.ChainDot])
        const memberName = parseIdentifier.call(this)
        const memberSpan = expression!.span.copy().expandEnd(memberName.span)
        expression = new MemberExpression(expression!, memberName, startMatch.tag, memberSpan)
    }
    return expression as MemberExpression
}
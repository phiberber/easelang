import {IdentifierExpression} from '@nodes/expression/IdentifierExpression';
import {Tag} from "@shared/Tag";
import {Parser} from "@front/parser/Parser";
import {parseIdentifier} from "@front/parser/expressions/ParseIdentifier";
import {MemberExpression} from "@nodes/expression/MemberExpression";
import {Expression} from "@nodes/expression/Expression";

export function parseMemberExpression(this: Parser, expression: Expression): MemberExpression | undefined {
    console.log(this.look)
    while (this.accept([Tag.Dot, Tag.ChainDot])) {
        const startMatch = this.match([Tag.Dot, Tag.ChainDot])
        const match = this.match(this.look.tag)
        const memberName = new IdentifierExpression(match.content, match.span)
        const memberSpan = expression!.span.copy().expandEnd(memberName.span)
        expression = new MemberExpression(expression!, memberName, startMatch.tag, memberSpan)
    }
    return expression as MemberExpression
}
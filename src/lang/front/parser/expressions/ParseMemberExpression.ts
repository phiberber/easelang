import {IdentifierLiteral} from '@/lang/shared/nodes/literal/IdentifierLiteral';
import {Tag} from "@/lang/shared/Tag";
import {Parser} from "@/lang/front/parser/Parser";
import {MemberExpression} from "@/lang/shared/nodes/expression/MemberExpression";
import {Expression} from "@/lang/shared/nodes/expression/Expression";

export function parseMemberExpression(this: Parser, object: Expression): MemberExpression | undefined {
    while (this.accept([Tag.Dot, Tag.ChainDot])) {
        const startMatch = this.match([Tag.Dot, Tag.ChainDot])
        const match = this.match(this.look.tag)
        const propertyName = new IdentifierLiteral(match.content, match.span)
        const propertySpan = object!.span.expand(propertyName.span)
        object = new MemberExpression(object!, propertyName, startMatch.tag, propertySpan)
    }
    return object as MemberExpression
}
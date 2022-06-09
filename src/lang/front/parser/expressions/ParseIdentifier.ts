import {IdentifierLiteral} from "@/lang/shared/nodes/literal/IdentifierLiteral";
import {Parser} from "@/lang/front/parser/Parser";
import {Tag} from "@/lang/shared/Tag";

export function parseIdentifier(this: Parser): IdentifierLiteral {
    const propertyToken = this.match(Tag.Identifier)
    return new IdentifierLiteral(propertyToken.content, propertyToken.span)
}
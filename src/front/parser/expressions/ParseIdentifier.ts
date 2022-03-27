import IdentifierExpression from "@nodes/expression/IdentifierExpression";
import Parser from "@front/parser/Parser";
import Tag from "@shared/Tag";

export default function parseIdentifier(this: Parser): IdentifierExpression {
    const propertyToken = this.match(Tag.Identifier)
    return new IdentifierExpression(propertyToken.content, propertyToken.span)
}
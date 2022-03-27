import BooleanLiteral from "@nodes/literal/BooleanLiteral";
import MemberExpression from "@nodes/expression/MemberExpression";
import NumericLiteral from "@nodes/literal/NumericLiteral";
import parseCallExpression from "@front/parser/expressions/ParseCallExpression";
import parseIdentifier from "@front/parser/expressions/ParseIdentifier";
import parseParenthesisExpression from "@front/parser/expressions/ParseParenthesisExpression";
import Parser from "@front/parser/Parser";
import StringLiteral from "@nodes/literal/StringLiteral";
import Tag from "@shared/Tag";
import {Factor} from "@shared/Type";

export default function parseFactor(this: Parser): Factor | undefined {
    let node: Factor | undefined
    let identifier

    if (this.accept(Tag.String)) {
        node = new StringLiteral(Tag.String, this.look.content, this.look.span)
        this.match(Tag.String)
    } else if (this.accept(Tag.Integer)) {
        node = new NumericLiteral(Tag.Integer, this.look.content, this.look.span)
        this.match(Tag.Integer)
    } else if (this.accept(Tag.Float)) {
        node = new NumericLiteral(Tag.Float, this.look.content, this.look.span)
        this.match(Tag.Float)
    } else if (this.accept(Tag.Boolean)) {
        node = new BooleanLiteral(this.look.content, this.look.span)
        this.match(Tag.Boolean)
    } else if (this.accept(Tag.OpenParenthesis)) {
        node = parseParenthesisExpression.call(this)
    } else {
        identifier = this.accept(Tag.Identifier) ? parseIdentifier.call(this) : undefined
    }

    while (this.expect(Tag.Identifier) && this.accept([Tag.Dot, Tag.ChainDot])) {
        const dotToken = this.match([Tag.Dot, Tag.ChainDot])
        const object = node ?? identifier ?? this.raise("A member expression requires a left side object.")
        const property = parseIdentifier.call(this)
        const memberSpan = object.span.copy().expandEnd(property.span)
        node = new MemberExpression(object, property, dotToken.tag, memberSpan)
    }

    if (this.accept(Tag.OpenParenthesis)) {
        if (!node && !identifier) this.raise("A function call must have a valid callee.")
        node = parseCallExpression.call(this, node ?? identifier)
    }

    if (!node && identifier) node = identifier

    return node
}
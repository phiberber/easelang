/**
 * This is not separated in files because it would make it unreadable.
 */
import Parser from "@front/parser/Parser";
import ParserNode from "@nodes/ParserNode";
import Tag, {EqualityTags, PrimaryArithmeticalTags, RelationTags, SecondaryArithmeticalTags} from "@shared/Tag";
import parseFunctionCall from "@front/parser/statements/ParseFunctionCall";
import parseNewStatement from "@front/parser/statements/ParseNewStatement";
import BooleanExpression from "@nodes/expression/BooleanExpression";
import BinaryExpression from "@nodes/expression/BinaryExpression";
import StringLiteral from "@nodes/literal/StringLiteral";
import NumericLiteral from "@nodes/literal/NumericLiteral";
import BooleanLiteral from "@nodes/literal/BooleanLiteral";
import VariableLiteral from "@nodes/literal/VariableLiteral";
import AccessedLiteral from "@nodes/literal/AccessedLiteral";

export default function parseExpression(this: Parser): ParserNode {
    let node = parseOrOperand.call(this)
    while (this.accept(Tag.BooleanOr)) {
        const acceptedNode = this.match(Tag.BooleanOr)
        const rightExpression = parseExpression.call(this)
        const expressionSpan = acceptedNode.span.copy().expandEnd(rightExpression.span)
        node = new BooleanExpression(acceptedNode.tag, node, rightExpression, expressionSpan)
    }
    return node
}

export function parseParenthesisExpression(this: Parser): ParserNode {
    let node
    this.match(Tag.OpenParenthesis)
    node = parseExpression.call(this)
    this.match(Tag.CloseParenthesis)
    return node
}

export function parseOrOperand(this: Parser): ParserNode {
    let node = parseAndOperand.call(this)
    while (this.accept(Tag.BooleanAnd)) {
        const acceptedNode = this.match(Tag.BooleanAnd)
        const rightExpression = parseExpression.call(this)
        const expressionSpan = acceptedNode.span.copy().expandEnd(rightExpression.span)
        node = new BooleanExpression(acceptedNode.tag, node, rightExpression, expressionSpan)
    }
    return node
}

export function parseAndOperand(this: Parser): ParserNode {
    let node = parseEqualityOperand.call(this)
    while (this.accept(RelationTags)) {
        const acceptedNode = this.match(RelationTags)
        const rightExpression = parseExpression.call(this)
        const expressionSpan = acceptedNode.span.copy().expandEnd(rightExpression.span)
        node = new BinaryExpression(acceptedNode.tag, node, rightExpression, expressionSpan)
    }
    return node
}

export function parseEqualityOperand(this: Parser): ParserNode {
    let node = parseSimpleExpression.call(this)
    while (this.accept(EqualityTags)) {
        const acceptedNode = this.match(EqualityTags)
        const rightExpression = parseExpression.call(this)
        const expressionSpan = acceptedNode.span.copy().expandEnd(rightExpression.span)
        node = new BinaryExpression(acceptedNode.tag, node, rightExpression, expressionSpan)
    }
    return node
}

export function parseSimpleExpression(this: Parser): ParserNode {
    let node = parseTerm.call(this)
    while (this.accept(PrimaryArithmeticalTags)) {
        const acceptedNode = this.match(PrimaryArithmeticalTags)
        const rightExpression = parseExpression.call(this)
        const expressionSpan = acceptedNode.span.copy().expandEnd(rightExpression.span)
        node = new BinaryExpression(acceptedNode.tag, node, rightExpression, expressionSpan)
    }
    return node
}

export function parseTerm(this: Parser): ParserNode {
    let node = parseNotOperand.call(this)
    while (this.accept(SecondaryArithmeticalTags)) {
        const acceptedNode = this.match(SecondaryArithmeticalTags)
        const rightExpression = parseExpression.call(this)
        const expressionSpan = acceptedNode.span.copy().expandEnd(rightExpression.span)
        node = new BinaryExpression(acceptedNode.tag, node, rightExpression, expressionSpan)
    }
    return node
}

export function parseNotOperand(this: Parser): ParserNode {
    let not = this.skip(Tag.BooleanNot)
    let node = parseFactor.call(this)
    return not ? new BooleanExpression(Tag.BooleanNot, undefined, node, not.span) : node
}

export function parseFactor(this: Parser): ParserNode {
    let node: ParserNode

    if(this.accept(Tag.String)) {
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
    } else if (this.accept(Tag.New) && this.expect(Tag.Identifier)) {
        node = parseNewStatement.call(this)
    } else if (this.accept(Tag.Identifier)) {
        if(this.expect(Tag.OpenParenthesis)) {
            node = parseFunctionCall.call(this)
        } else {
            node = new VariableLiteral(Tag.Identifier, this.look.content, this.look.span)
            this.match(Tag.Identifier)
        }
    }

    if(this.accept([Tag.Dot, Tag.SafeDot]) && this.expect(Tag.Identifier)) {
        this.match([Tag.Dot, Tag.SafeDot])
        let expressionPath = this.match(Tag.Identifier).content
        return new AccessedLiteral(expressionPath, node, node.span.copy().expandEnd(this.span))
    }

    return node
}
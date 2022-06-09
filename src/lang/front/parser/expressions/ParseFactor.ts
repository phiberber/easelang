import {BooleanLiteral} from "@/lang/shared/nodes/literal/BooleanLiteral";
import {Factor} from "@/lang/shared/Type";
import {NumericLiteral} from "@/lang/shared/nodes/literal/NumericLiteral";
import {parseIdentifier} from "@/lang/front/parser/expressions/ParseIdentifier";
import {parseParenthesisExpression} from "@/lang/front/parser/expressions/ParseParenthesisExpression";
import {Parser} from "@/lang/front/parser/Parser";
import {StringLiteral} from "@/lang/shared/nodes/literal/StringLiteral";
import {Tag} from "@/lang/shared/Tag";
import {parseArrayExpression} from "@/lang/front/parser/expressions/ParseArrayExpression";
import {parseMemberExpression} from "@/lang/front/parser/expressions/ParseMemberExpression";
import {parseCallExpression} from "@/lang/front/parser/expressions/ParseCallExpression";
import {MemberExpression} from "@/lang/shared/nodes/expression/MemberExpression";
import {CallExpression} from "@/lang/shared/nodes/expression/CallExpression";

export function parseFactor(this: Parser): Factor | undefined {
    let node: Factor | undefined
    let identifier

    if (this.accept(Tag.String)) {
        node = new StringLiteral(this.look.content, this.look.span)
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
    } else if (this.accept(Tag.OpenBrackets)) {
        node = parseArrayExpression.call(this)
    } else if (this.accept(Tag.OpenParenthesis)) {
        node = parseParenthesisExpression.call(this)
    } else {
        identifier = this.accept(Tag.Identifier) ? parseIdentifier.call(this) : undefined
    }

    if (!node && identifier) node = identifier

    const expectCall = () => {
        const lastToken = this.content[this.span.index - 1]
        const lastTokenTag = lastToken?.tag
        if (
            node instanceof MemberExpression ||
            node instanceof CallExpression ||
            lastTokenTag === Tag.Identifier
        ) {
            return this.accept([Tag.OpenParenthesis, Tag.OpenBraces])
        } else return false
    }

    const expectMember = () => this.accept([Tag.Dot, Tag.ChainDot])

    while (expectCall() || expectMember()) {
        if (expectMember()) {
            if (!node) this.raise("A member expression should requires a left side object")
            node = parseMemberExpression.call(this, node!)
        }
        if (expectCall()) {
            if (!node) this.raise("A function call must have a valid callee")
            node = parseCallExpression.call(this, node!)
        }
    }

    return node
}
import {BooleanLiteral} from "@nodes/literal/BooleanLiteral";
import {Factor} from "@shared/Type";
import {NumericLiteral} from "@nodes/literal/NumericLiteral";
import {parseIdentifier} from "@front/parser/expressions/ParseIdentifier";
import {parseParenthesisExpression} from "@front/parser/expressions/ParseParenthesisExpression";
import {Parser} from "@front/parser/Parser";
import {StringLiteral} from "@nodes/literal/StringLiteral";
import {Tag} from "@shared/Tag";
import {parseArrayExpression} from "@front/parser/expressions/ParseArrayExpression";
import {parseMemberExpression} from "@front/parser/expressions/ParseMemberExpression";
import {parseCallExpression} from "@front/parser/expressions/ParseCallExpression";
import { MemberExpression } from "@/shared/nodes/expression/MemberExpression";
import { FunctionExpression } from "@/shared/nodes/declare/FunctionExpression";
import { CallExpression } from "@/shared/nodes/expression/CallExpression";

export function parseFactor(this: Parser): Factor | undefined {
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
    } else if (this.accept(Tag.OpenBrackets)) {
        node = parseArrayExpression.call(this)
    }  else if (this.accept(Tag.OpenParenthesis)) {
        node = parseParenthesisExpression.call(this)
    } else {
        identifier = this.accept(Tag.Identifier) ? parseIdentifier.call(this) : undefined
    }

    if (!node && identifier) node = identifier

    const expectCall = () => {
        const lastToken = this.content[this.span.index - 1]
        const lastTokenTag = lastToken?.tag
        if(
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
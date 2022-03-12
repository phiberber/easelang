import ConditionalStatement from "@nodes/statement/ConditionalStatement";
import parseExpression from "@front/parser/expressions/ParseExpression";
import parseBlock from "@front/parser/misc/ParseBlock";
import Parser from "@front/parser/Parser";
import Tag from "@shared/Tag";

export default function parseIfStatement(this: Parser): ConditionalStatement {
    const startMatch = this.match(Tag.If)
    const elseStatements = []

    this.match(Tag.OpenParenthesis)

    const condition = parseExpression.call(this)

    this.match(Tag.CloseParenthesis)

    const block = parseBlock.call(this)

    while (this.accept(Tag.Else)) {
        const elseMatch = this.match(Tag.Else)
        if (this.accept(Tag.If)) {
            const fallbackNode = this.match(Tag.If)
            this.match(Tag.OpenParenthesis)
            const fallbackCondition = parseExpression.call(this)
            this.match(Tag.CloseParenthesis)
            const fallbackBlock = parseBlock.call(this)
            elseStatements.push(new ConditionalStatement(fallbackCondition, [], fallbackBlock, fallbackNode.span))
        } else {
            const fallbackBlock = parseBlock.call(this)
            elseStatements.push(new ConditionalStatement(undefined, [], fallbackBlock, elseMatch.span))
        }
    }

    const ifSpan = startMatch.span.copy().expandEnd(this.span)
    return new ConditionalStatement(condition, elseStatements, block, ifSpan)
}
import {BlockExpression} from "@nodes/expression/BlockExpression";
import {parseBlock} from "@front/parser/misc/ParseBlock";
import {parseExpression} from "@front/parser/expressions/ParseExpression";
import {Parser} from "@front/parser/Parser";
import {Tag} from "@shared/Tag";
import {WhileStatement} from "@nodes/statement/WhileStatement";

export function parseWhileStatement(this: Parser): WhileStatement {
    const startMatch = this.match(Tag.While)

    this.skip(Tag.OpenParenthesis)
    const condition = parseExpression.call(this) ?? this.raise("Expected condition in while statement")

    this.skip(Tag.CloseParenthesis)
    const block = parseBlock.call(this)

    let fallbackBlock: BlockExpression | undefined = undefined

    if (this.accept(Tag.Else)) {
        this.match(Tag.Else)
        fallbackBlock = parseBlock.call(this)
    }

    return new WhileStatement(condition, fallbackBlock, block, startMatch.span.copy().expandEnd(this.span))
}
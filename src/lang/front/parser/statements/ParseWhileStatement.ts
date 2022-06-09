import {BlockExpression} from "@/lang/shared/nodes/expression/BlockExpression";
import {parseBlock} from "@/lang/front/parser/misc/ParseBlock";
import {parseExpression} from "@/lang/front/parser/expressions/ParseExpression";
import {Parser} from "@/lang/front/parser/Parser";
import {Tag} from "@/lang/shared/Tag";
import {WhileStatement} from "@/lang/shared/nodes/statement/WhileStatement";

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

    return new WhileStatement(condition, fallbackBlock, block, startMatch.span.expand(this.span))
}
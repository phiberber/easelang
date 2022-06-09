import {BooleanExpression} from "@/lang/shared/nodes/expression/BooleanExpression";
import {OrOperand} from "@/lang/shared/Type";
import {parseComparisonOperand} from "@/lang/front/parser/expressions/ParseComparisonOperand";
import {parseExpression} from "@/lang/front/parser/expressions/ParseExpression";
import {Parser} from "@/lang/front/parser/Parser";
import {Tag} from "@/lang/shared/Tag";

export function parseBooleanExpression(this: Parser): OrOperand {
    let node = parseComparisonOperand.call(this)
    while (this.accept([Tag.BooleanAnd, Tag.BooleanOr])) {
        const acceptedNode = this.match([Tag.BooleanAnd, Tag.BooleanOr])
        const rightExpression = parseExpression.call(this) ?? this.raise("Expected expression after '" + acceptedNode.content + "'")
        const expressionSpan = acceptedNode.span.expand(rightExpression.span)
        node = new BooleanExpression(acceptedNode.tag, node, rightExpression, expressionSpan)
    }
    return node
}
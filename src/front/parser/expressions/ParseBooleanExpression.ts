import BooleanExpression from "@nodes/expression/BooleanExpression";
import parseComparisonOperand from "@front/parser/expressions/ParseComparisonOperand";
import parseExpression from "@front/parser/expressions/ParseExpression";
import Parser from "@front/parser/Parser";
import Tag from "@shared/Tag";
import {OrOperand} from "@shared/Type";

export default function parseBooleanExpression(this: Parser): OrOperand {
    let node = parseComparisonOperand.call(this)
    while (this.accept([Tag.BooleanAnd, Tag.BooleanOr])) {
        const acceptedNode = this.match([Tag.BooleanAnd, Tag.BooleanOr])
        const rightExpression = parseExpression.call(this) ?? this.raise("Expected expression after '" + acceptedNode.content + "'")
        const expressionSpan = acceptedNode.span.copy().expandEnd(rightExpression.span)
        node = new BooleanExpression(acceptedNode.tag, node, rightExpression, expressionSpan)
    }
    return node
}
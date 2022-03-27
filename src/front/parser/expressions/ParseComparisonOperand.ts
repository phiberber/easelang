import BinaryExpression from "@nodes/expression/BinaryExpression";
import parseEqualityOperand from "@front/parser/expressions/ParseEqualityOperand";
import parseExpression from "@front/parser/expressions/ParseExpression";
import Parser from "@front/parser/Parser";
import {AndOperand} from "@shared/Type";
import {ComparisonTags} from "@shared/Tag";

export default function parseComparisonOperand(this: Parser): AndOperand {
    let node = parseEqualityOperand.call(this)
    while (this.accept(ComparisonTags)) {
        const acceptedNode = this.match(ComparisonTags)
        const rightExpression = parseExpression.call(this) ?? this.raise("Expected expression after '" + acceptedNode.content + "'")
        const expressionSpan = acceptedNode.span.copy().expandEnd(rightExpression.span)
        node = new BinaryExpression(acceptedNode.tag, node ?? this.raise("Expected left-side in Binary Expression"), rightExpression, expressionSpan)
    }
    return node
}
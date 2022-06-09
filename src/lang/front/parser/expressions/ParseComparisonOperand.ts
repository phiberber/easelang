import {AndOperand} from "@/lang/shared/Type";
import {BinaryExpression} from "@/lang/shared/nodes/expression/BinaryExpression";
import {ComparisonTags} from "@/lang/shared/Tag";
import {parseEqualityOperand} from "@/lang/front/parser/expressions/ParseEqualityOperand";
import {parseExpression} from "@/lang/front/parser/expressions/ParseExpression";
import {Parser} from "@/lang/front/parser/Parser";

export function parseComparisonOperand(this: Parser): AndOperand {
    let node = parseEqualityOperand.call(this)
    while (this.accept(ComparisonTags)) {
        const acceptedNode = this.match(ComparisonTags)
        const rightExpression = parseExpression.call(this) ?? this.raise("Expected expression after '" + acceptedNode.content + "'")
        const expressionSpan = acceptedNode.span.expand(rightExpression.span)
        node = new BinaryExpression(acceptedNode.tag, node ?? this.raise("Expected left-side in Binary Expression"), rightExpression, expressionSpan)
    }
    return node
}
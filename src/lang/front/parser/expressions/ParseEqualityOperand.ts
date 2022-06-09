import {BinaryExpression} from "@/lang/shared/nodes/expression/BinaryExpression";
import {EqualityOperand} from "@/lang/shared/Type";
import {EqualityTags} from "@/lang/shared/Tag";
import {parseExpression} from "@/lang/front/parser/expressions/ParseExpression";
import {Parser} from "@/lang/front/parser/Parser";
import {parseSimpleExpression} from "@/lang/front/parser/expressions/ParseSimpleExpression";

export function parseEqualityOperand(this: Parser): EqualityOperand {
    let node = parseSimpleExpression.call(this)
    while (this.accept(EqualityTags)) {
        const acceptedNode = this.match(EqualityTags)
        const rightExpression = parseExpression.call(this) ?? this.raise("Expected expression after '" + acceptedNode.content + "'")
        const expressionSpan = acceptedNode.span.expand(rightExpression.span)
        node = new BinaryExpression(acceptedNode.tag, node ?? this.raise("Expected left-side in Binary Expression"), rightExpression, expressionSpan)
    }
    return node
}
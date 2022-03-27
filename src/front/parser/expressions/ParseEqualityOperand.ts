import BinaryExpression from "@nodes/expression/BinaryExpression";
import parseExpression from "@front/parser/expressions/ParseExpression";
import Parser from "@front/parser/Parser";
import parseSimpleExpression from "@front/parser/expressions/ParseSimpleExpression";
import {EqualityOperand} from "@shared/Type";
import {EqualityTags} from "@shared/Tag";

export default function parseEqualityOperand(this: Parser): EqualityOperand {
    let node = parseSimpleExpression.call(this)
    while (this.accept(EqualityTags)) {
        const acceptedNode = this.match(EqualityTags)
        const rightExpression = parseExpression.call(this) ?? this.raise("Expected expression after '" + acceptedNode.content + "'")
        const expressionSpan = acceptedNode.span.copy().expandEnd(rightExpression.span)
        node = new BinaryExpression(acceptedNode.tag, node ?? this.raise("Expected left-side in Binary Expression"), rightExpression, expressionSpan)
    }
    return node
}
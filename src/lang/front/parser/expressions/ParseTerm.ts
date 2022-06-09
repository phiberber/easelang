import {BinaryExpression} from "@/lang/shared/nodes/expression/BinaryExpression";
import {parseFactor} from "@/lang/front/parser/expressions/ParseFactor";
import {Parser} from "@/lang/front/parser/Parser";
import {SecondaryArithmeticalTags} from "@/lang/shared/Tag";
import {Term} from "@/lang/shared/Type";
import {parseSimpleExpression} from "@/lang/front/parser/expressions/ParseSimpleExpression";

export function parseTerm(this: Parser): Term {
    let node = parseFactor.call(this)
    while (this.accept(SecondaryArithmeticalTags)) {
        const acceptedNode = this.match(SecondaryArithmeticalTags)
        const rightExpression = parseSimpleExpression.call(this) ?? this.raise("Expected expression after '" + acceptedNode.content + "'")
        const expressionSpan = acceptedNode.span.expand(rightExpression.span)
        node = new BinaryExpression(acceptedNode.tag, node ?? this.raise("Expected left-side in Binary Expression"), rightExpression, expressionSpan)
    }
    return node
}
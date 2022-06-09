import {BinaryExpression} from "@/lang/shared/nodes/expression/BinaryExpression";
import {parseExpression} from "@/lang/front/parser/expressions/ParseExpression";
import {Parser} from "@/lang/front/parser/Parser";
import {parseTerm} from "@/lang/front/parser/expressions/ParseTerm";
import {PrimaryArithmeticalTags} from "@/lang/shared/Tag";
import {SimpleExpression} from "@/lang/shared/Type";

export function parseSimpleExpression(this: Parser): SimpleExpression {
    let node = parseTerm.call(this)
    while (this.accept(PrimaryArithmeticalTags)) {
        const acceptedNode = this.match(PrimaryArithmeticalTags)
        const rightExpression = parseExpression.call(this) ?? this.raise("Expected expression after '" + acceptedNode.content + "'")
        const expressionSpan = acceptedNode.span.expand(rightExpression.span)
        node = new BinaryExpression(acceptedNode.tag, node ?? this.raise("Expected left-side in Binary Expression"), rightExpression, expressionSpan)
    }
    return node
}
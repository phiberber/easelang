import BinaryExpression from "@nodes/expression/BinaryExpression";
import parseExpression from "@front/parser/expressions/ParseExpression";
import Parser from "@front/parser/Parser";
import parseTerm from "@front/parser/expressions/ParseTerm";
import {PrimaryArithmeticalTags} from "@shared/Tag";
import {SimpleExpression} from "@shared/Type";

export default function parseSimpleExpression(this: Parser): SimpleExpression {
    let node = parseTerm.call(this)
    while (this.accept(PrimaryArithmeticalTags)) {
        const acceptedNode = this.match(PrimaryArithmeticalTags)
        const rightExpression = parseExpression.call(this) ?? this.raise("Expected expression after '" + acceptedNode.content + "'")
        const expressionSpan = acceptedNode.span.copy().expandEnd(rightExpression.span)
        node = new BinaryExpression(acceptedNode.tag, node ?? this.raise("Expected left-side in Binary Expression"), rightExpression, expressionSpan)
    }
    return node
}
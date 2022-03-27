import {BinaryExpression} from "@nodes/expression/BinaryExpression";
import {parseExpression} from "@front/parser/expressions/ParseExpression";
import {parseFactor} from "@front/parser/expressions/ParseFactor";
import {Parser} from "@front/parser/Parser";
import {SecondaryArithmeticalTags} from "@shared/Tag";
import {Term} from "@shared/Type";

export function parseTerm(this: Parser): Term {
    let node = parseFactor.call(this)
    while (this.accept(SecondaryArithmeticalTags)) {
        const acceptedNode = this.match(SecondaryArithmeticalTags)
        const rightExpression = parseExpression.call(this) ?? this.raise("Expected expression after '" + acceptedNode.content + "'")
        const expressionSpan = acceptedNode.span.copy().expandEnd(rightExpression.span)
        node = new BinaryExpression(acceptedNode.tag, node ?? this.raise("Expected left-side in Binary Expression"), rightExpression, expressionSpan)
    }
    return node
}
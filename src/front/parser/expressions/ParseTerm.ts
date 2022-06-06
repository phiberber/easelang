import {BinaryExpression} from "@nodes/expression/BinaryExpression";
import {parseFactor} from "@front/parser/expressions/ParseFactor";
import {Parser} from "@front/parser/Parser";
import {SecondaryArithmeticalTags} from "@shared/Tag";
import {Term} from "@shared/Type";
import {parseSimpleExpression} from "@front/parser/expressions/ParseSimpleExpression";

export function parseTerm(this: Parser): Term {
    let node = parseFactor.call(this)
    while (this.accept(SecondaryArithmeticalTags)) {
        if(!node) console.log(this.look)
        const acceptedNode = this.match(SecondaryArithmeticalTags)
        const rightExpression = parseSimpleExpression.call(this) ?? this.raise("Expected expression after '" + acceptedNode.content + "'")
        const expressionSpan = acceptedNode.span.copy().expandEnd(rightExpression.span)
        node = new BinaryExpression(acceptedNode.tag, node ?? this.raise("Expected left-side in Binary Expression"), rightExpression, expressionSpan)
    }
    return node
}
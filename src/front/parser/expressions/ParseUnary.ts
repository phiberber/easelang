import Parser from "@front/parser/Parser";
import {UnaryTags} from "@shared/Tag";
import {Unary} from "@shared/Type";
import UnaryExpression from "@nodes/expression/UnaryExpression";

export default function parseUnary(this: Parser): Unary {
    let node = parseUnary.call(this)
    while (this.accept(UnaryTags)) {
        const acceptedNode = this.match(UnaryTags)
        const expressionSpan = acceptedNode.span.copy().expandEnd(acceptedNode.span)
        node = new UnaryExpression(acceptedNode.tag, node ?? this.raise("Expected left-side in Unary Expression"), expressionSpan)
    }
    return node
}
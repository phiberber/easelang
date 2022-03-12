import Literal from "@nodes/literal/Literal";
import ParserNode from "@nodes/ParserNode";
import Span from "@shared/Span";

export default class AccessedLiteral<T> extends Literal<string> {
    public name: string
    public node: ParserNode
    public span: Span;

    constructor(name: string, node: ParserNode, span: Span) {
        super();
        this.name = name
        this.node = node
        this.span = span
    }
}
import Expression from "@nodes/expression/Expression";
import ParserNode from "@nodes/ParserNode";
import Span from "@shared/Span";
import Tag from "@shared/Tag";

export default class BooleanExpression extends Expression {
    public operator: Tag
    public left: ParserNode
    public right: ParserNode
    public span: Span

    constructor(operator: Tag, left: ParserNode, right: ParserNode, span: Span) {
        super()
        this.span = span
        this.operator = operator
        this.left = left
        this.right = right
    }
}
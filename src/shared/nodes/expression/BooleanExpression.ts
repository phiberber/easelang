import Expression from "@nodes/expression/Expression";
import ParserNode from "@nodes/ParserNode";
import Span from "@shared/Span";
import Tag from "@shared/Tag";

export default class BooleanExpression extends Expression {
    public nodeType: string = "BooleanExpression";
    public operator: Tag
    public left: ParserNode | undefined
    public right: ParserNode | undefined
    public span: Span

    constructor(operator: Tag, left: ParserNode | undefined, right: ParserNode | undefined, span: Span) {
        super()
        this.span = span
        this.operator = operator
        this.left = left
        this.right = right
    }
}
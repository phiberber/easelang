import LiteralExpression from "@nodes/literal/LiteralExpression";
import Span from "@shared/Span";
import Tag from "@shared/Tag";

export default class BooleanLiteral extends LiteralExpression<boolean> {
    public nodeType = "BooleanLiteral"
    public tag: Tag = Tag.Boolean
    public value: boolean
    public span: Span

    constructor(value: boolean, span: Span) {
        super();
        this.span = span
        this.value = value
        this.span = span
    }
}
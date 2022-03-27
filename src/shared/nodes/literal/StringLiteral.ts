import LiteralExpression from "@nodes/literal/LiteralExpression";
import Span from "@shared/Span";
import Tag from "@shared/Tag";

export default class StringLiteral extends LiteralExpression<string> {
    public nodeType = "StringLiteral"
    public tag: Tag
    public value: string
    public span: Span

    constructor(tag: Tag, value: string, span: Span) {
        super();
        this.span = span
        this.tag = tag
        this.value = value
        this.span = span
    }
}
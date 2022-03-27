import {LiteralExpression} from "@nodes/literal/LiteralExpression";
import {Span} from "@shared/Span";
import {Tag} from "@shared/Tag";

export class NumericLiteral extends LiteralExpression<number> {
    public nodeType = "NumericLiteral"
    public tag: Tag
    public value: number
    public span: Span

    constructor(tag: Tag, value: number, span: Span) {
        super();
        this.span = span
        this.tag = tag
        this.value = value
        this.span = span
    }
}
import Literal from "@nodes/literal/Literal";
import Span from "@shared/Span";
import Tag from "@shared/Tag";

export default class NumericLiteral extends Literal<number> {
    public tag: Tag
    public name: number
    public span: Span

    constructor(tag: Tag, value: number, span: Span) {
        super();
        this.span = span
        this.tag = tag
        this.name = value
        this.span = span
    }
}
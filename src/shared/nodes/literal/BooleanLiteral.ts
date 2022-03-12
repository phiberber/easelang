import Literal from "@nodes/literal/Literal";
import Span from "@shared/Span";
import Tag from "@shared/Tag";

export default class BooleanLiteral extends Literal<boolean> {
    public tag: Tag = Tag.Boolean
    public name: boolean
    public span: Span

    constructor(value: boolean, span: Span) {
        super();
        this.span = span
        this.name = value
        this.span = span
    }
}
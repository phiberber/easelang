import Literal from "@nodes/literal/Literal";
import Span from "@shared/Span";
import Tag from "@shared/Tag";

export default class VariableLiteral extends Literal<string> {
    public tag: Tag
    public name: string
    public span: Span

    constructor(tag: Tag, name: string, span: Span) {
        super();
        this.span = span
        this.tag = tag
        this.name = name
        this.span = span
    }
}
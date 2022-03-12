import {Span} from "../../Span";
import {Literal} from "./Literal";
import Tag from "../../Tag";

export class VariableLiteral extends Literal<string> {
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
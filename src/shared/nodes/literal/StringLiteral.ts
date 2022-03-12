import {Literal} from "./Literal";
import {Span} from "../../Span";
import Tag from "../../Tag";

export class StringLiteral extends Literal<string> {
    public tag: Tag
    public name: string
    public span: Span

    constructor(tag: Tag, value: string, span: Span) {
        super();
        this.span = span
        this.tag = tag
        this.name = value
        this.span = span
    }
}
import {Literal} from "./Literal";
import {Span} from "../../Span";
import Tag from "../../Tag";

export class NumericLiteral extends Literal<number> {
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
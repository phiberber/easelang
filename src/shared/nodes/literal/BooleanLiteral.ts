import {Literal} from "./Literal";
import {Span} from "../../Span";
import Tag from "../../Tag";

export class BooleanLiteral extends Literal<boolean> {
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
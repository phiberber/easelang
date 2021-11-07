import {Literal} from "./Literal";
import {Span} from "../../../front/Span";
import Tag from "../../../front/lexer/Tag";

export class NumericLiteral extends Literal<Number> {

    tag: Tag
    name: Number
    span: Span

    constructor(tag: Tag, value: Number, span: Span) {
        super();
        this.span = span
        this.tag = tag
        this.name = value
        this.span = span
    }

}
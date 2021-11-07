import {Literal} from "./Literal";
import {Span} from "../../../front/Span";
import Tag from "../../../front/lexer/Tag";

export class StringLiteral extends Literal<String> {

    tag: Tag
    name: String
    span: Span

    constructor(tag: Tag, value: String, span: Span) {
        super();
        this.span = span
        this.tag = tag
        this.name = value
        this.span = span
    }

}
import {Span} from "../../../front/Span";
import {Literal} from "./Literal";
import Tag from "../../../front/lexer/Tag";

export class VariableLiteral extends Literal<String> {

    tag: Tag
    name: String
    span: Span

    constructor(tag: Tag, name: String, span: Span) {
        super();
        this.span = span
        this.tag = tag
        this.name = name
        this.span = span
    }

}
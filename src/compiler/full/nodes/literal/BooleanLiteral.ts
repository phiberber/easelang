import {Literal} from "./Literal";
import {Span} from "../../../front/Span";
import Tag from "../../../front/lexer/Tag";

export class BooleanLiteral extends Literal<Boolean> {

    tag: Symbol = Tag.Boolean
    name: Boolean
    span: Span

    constructor(value: Boolean, span: Span) {
        super();
        this.span = span
        this.name = value
        this.span = span
    }

}
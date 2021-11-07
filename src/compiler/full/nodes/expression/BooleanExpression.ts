import {ParserNode} from "../ParserNode";
import {Expression} from "./Expression";
import {Span} from "../../../front/Span";
import Tag from "../../../front/lexer/Tag";

export class BooleanExpression extends Expression {

    operator: Tag
    left: ParserNode
    right: ParserNode
    span: Span

    constructor(operator: Tag, left: ParserNode, right: ParserNode, span: Span) {
        super()
        this.span = span
        this.operator = operator
        this.left = left
        this.right = right
    }

}
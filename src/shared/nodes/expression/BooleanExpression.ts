import {ParserNode} from "../ParserNode";
import {Expression} from "./Expression";
import {Span} from "../../Span";
import Tag from "../../Tag";

export class BooleanExpression extends Expression {
    public operator: Tag
    public left: ParserNode
    public right: ParserNode
    public span: Span

    constructor(operator: Tag, left: ParserNode, right: ParserNode, span: Span) {
        super()
        this.span = span
        this.operator = operator
        this.left = left
        this.right = right
    }
}
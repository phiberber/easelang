import {ParserNode} from "../ParserNode";
import {Expression} from "./Expression";
import {Span} from "../../Span";
import Tag from "../../Tag";

export class BinaryExpression extends Expression {
    public nodeType: string = "BinaryExpression";
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
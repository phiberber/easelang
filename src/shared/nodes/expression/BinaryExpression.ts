import {Expression} from "@nodes/expression/Expression";
import {Span} from "@shared/Span";
import {Tag} from "@shared/Tag";

export class BinaryExpression extends Expression {
    public nodeType: string = "BinaryExpression";
    public operator: Tag
    public left: Expression
    public right: Expression
    public span: Span

    constructor(operator: Tag, left: Expression, right: Expression, span: Span) {
        super()
        this.span = span
        this.operator = operator
        this.left = left
        this.right = right
    }
}
import {Expression} from "@/lang/shared/nodes/expression/Expression";
import {Span} from "@/lang/shared/Span";
import {Tag} from "@/lang/shared/Tag";

export class BinaryExpression extends Expression {

    public readonly operator: Tag
    public readonly left: Expression
    public readonly right: Expression

    constructor(operator: Tag, left: Expression, right: Expression, span: Span) {
        super(span)
        this.operator = operator
        this.left = left
        this.right = right
    }

}
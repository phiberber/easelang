import {Expression} from "@/lang/shared/nodes/expression/Expression";
import {BaseNode} from "@/lang/shared/nodes/BaseNode";
import {Span} from "@/lang/shared/Span";
import {Tag} from "@/lang/shared/Tag";

export class BooleanExpression extends Expression {

    public readonly operator: Tag
    public readonly left: BaseNode | undefined
    public readonly right: BaseNode | undefined

    constructor(operator: Tag, left: BaseNode | undefined, right: BaseNode | undefined, span: Span) {
        super(span)
        this.operator = operator
        this.left = left
        this.right = right
    }

}
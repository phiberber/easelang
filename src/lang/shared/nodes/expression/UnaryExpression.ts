import {Expression} from "@/lang/shared/nodes/expression/Expression";
import {Span} from "@/lang/shared/Span";
import {Tag} from "@/lang/shared/Tag";

export class UnaryExpression extends Expression {

    public readonly argument: Expression
    public readonly operator: Tag
    public readonly prefix: boolean

    constructor(operator: Tag, argument: Expression, prefix: boolean, span: Span) {
        super(span)
        this.argument = argument
        this.operator = operator
        this.prefix = prefix
    }
}
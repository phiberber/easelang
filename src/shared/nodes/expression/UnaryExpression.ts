import {Expression} from "@nodes/expression/Expression";
import {Span} from "@shared/Span";
import {Tag} from "@shared/Tag";

export class UnaryExpression extends Expression {
    public nodeType: string = "UnaryExpression";
    public argument: Expression
    public operator: Tag
    public prefix: boolean
    public span: Span

    constructor(operator: Tag, argument: Expression, prefix: boolean, span: Span) {
        super()
        this.argument = argument
        this.operator = operator
        this.prefix = prefix
        this.span = span
    }
}
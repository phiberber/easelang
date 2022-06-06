import {Span} from "@shared/Span";
import {Expression} from "@nodes/expression/Expression";

export class ArrayExpression extends Expression {
    public nodeType: string = "ArrayExpression"
    public values: Expression[]
    public span: Span

    constructor(values: Expression[], span: Span) {
        super();
        this.values = values
        this.span = span
    }
}
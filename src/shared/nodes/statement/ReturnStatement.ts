import Span from "@shared/Span";
import Expression from "@nodes/expression/Expression";
import Statement from "@nodes/statement/Statement";

export class ReturnStatement extends Statement {
    public nodeType: string = "ReturnStatement"
    public value: Expression
    public span: Span

    constructor(value: Expression, span: Span) {
        super();
        this.span = span
        this.value = value
    }
}
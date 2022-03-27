import {Span} from "@shared/Span";
import {Expression} from "@nodes/expression/Expression";

export class IdentifierExpression extends Expression {

    public nodeType: string = "IdentifierExpression";
    public span: Span;
    public value: string;

    public static empty = new IdentifierExpression("")

    public constructor(value: string, span: Span = Span.empty) {
        super();
        this.value = value;
        this.span = span;
    }

    public copy(): IdentifierExpression {
        return new IdentifierExpression(this.value, this.span);
    }
}
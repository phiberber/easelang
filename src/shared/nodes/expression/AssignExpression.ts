import {Span} from "@shared/Span";
import {Token} from "@shared/Token";
import {Expression} from "@nodes/expression/Expression";
import {IdentifierExpression} from "@nodes/expression/IdentifierExpression";
import {MemberExpression} from "@nodes/expression/MemberExpression";

export class AssignExpression extends Expression {
    public nodeType: string = "AssignExpression"
    public assigned: IdentifierExpression | MemberExpression
    public operator: Token<string>
    public value: Expression
    public span: Span

    constructor(assigned: IdentifierExpression | MemberExpression, operator: Token<string>, value: Expression, span: Span) {
        super();
        this.assigned = assigned
        this.operator = operator
        this.value = value
        this.span = span
    }
}
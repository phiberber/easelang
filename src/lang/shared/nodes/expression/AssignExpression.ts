import {Span} from "@/lang/shared/Span";
import {Token} from "@/lang/shared/Token";
import {Expression} from "@/lang/shared/nodes/expression/Expression";
import {IdentifierLiteral} from "@/lang/shared/nodes/literal/IdentifierLiteral";
import {MemberExpression} from "@/lang/shared/nodes/expression/MemberExpression";

export class AssignExpression extends Expression {

    public readonly assigned: IdentifierLiteral | MemberExpression
    public readonly operator: Token<string>
    public readonly value: Expression

    constructor(assigned: IdentifierLiteral | MemberExpression, operator: Token<string>, value: Expression, span: Span) {
        super(span);
        this.assigned = assigned
        this.operator = operator
        this.value = value
    }

}
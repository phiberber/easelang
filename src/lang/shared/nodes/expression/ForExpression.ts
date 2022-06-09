import {Span} from "@/lang/shared/Span";
import {Expression} from "@/lang/shared/nodes/expression/Expression";
import {BlockExpression} from "@/lang/shared/nodes/expression/BlockExpression";
import {IdentifierLiteral} from "@/lang/shared/nodes/literal/IdentifierLiteral";

export class ForExpression extends Expression {

    public readonly left: IdentifierLiteral
    public readonly right: Expression
    public readonly body: BlockExpression

    public constructor(left: IdentifierLiteral, right: Expression, body: BlockExpression, span: Span) {
        super(span)
        this.left = left
        this.right = right
        this.body = body
    }

}
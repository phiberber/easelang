import {Span} from "@shared/Span";
import {Expression} from "@nodes/expression/Expression";
import {BlockExpression} from "@nodes/expression/BlockExpression";
import {IdentifierExpression} from "@nodes/expression/IdentifierExpression";

export class ForExpression extends Expression {

    public nodeType: string = "ForExpression"
    public span: Span
    public left: IdentifierExpression
    public right: Expression
    public body: BlockExpression

    public constructor(left: IdentifierExpression, right: Expression, body: BlockExpression, span: Span) {
        super()
        this.left = left
        this.right = right
        this.body = body
        this.span = span
    }

}
import {ParserNode} from "@nodes/ParserNode";
import {Span} from "@shared/Span";
import {Tag} from "@shared/Tag";
import {IdentifierExpression} from "@nodes/expression/IdentifierExpression";
import {Expression} from "@nodes/expression/Expression";

export class MemberExpression extends Expression {
    public nodeType: string = "MemberExpression";
    public left: ParserNode
    public right: IdentifierExpression
    public operator: Tag
    public span: Span;

    public constructor(left: ParserNode, right: IdentifierExpression, operator: Tag, span: Span) {
        super();
        this.left = left
        this.right = right
        this.operator = operator
        this.span = span
    }

    public toString(): string {
        return `${this.left}${this.operator.content}${this.right}`
    }

}
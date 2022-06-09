import {BaseNode} from "@/lang/shared/nodes/BaseNode";
import {Span} from "@/lang/shared/Span";
import {Tag} from "@/lang/shared/Tag";
import {IdentifierLiteral} from "@/lang/shared/nodes/literal/IdentifierLiteral";
import {Expression} from "@/lang/shared/nodes/expression/Expression";

export class MemberExpression extends Expression {

    public readonly object: BaseNode
    public readonly property: IdentifierLiteral
    public readonly operator: Tag

    public constructor(left: BaseNode, right: IdentifierLiteral, operator: Tag, span: Span) {
        super(span);
        this.object = left
        this.property = right
        this.operator = operator
    }

}
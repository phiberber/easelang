import {BaseNode} from "@/lang/shared/nodes/BaseNode";
import {Span} from "@/lang/shared/Span";
import {IdentifierLiteral} from "@/lang/shared/nodes/literal/IdentifierLiteral";
import {Expression} from "@/lang/shared/nodes/expression/Expression";

export type CalleeCandidate = IdentifierLiteral | Expression

export class CallExpression extends Expression {

    public readonly callee: CalleeCandidate
    public readonly arguments: BaseNode[]

    public constructor(callee: CalleeCandidate, parameters: BaseNode[], span: Span) {
        super(span);
        this.callee = callee
        this.arguments = parameters
    }
}
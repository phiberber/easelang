import ParserNode from "@nodes/ParserNode";
import Token from "@shared/Token";
import Span from "@shared/Span";
import IdentifierExpression from "@nodes/expression/IdentifierExpression";
import Expression from "@nodes/expression/Expression";
import LiteralExpression from "@nodes/literal/LiteralExpression";

export type CalleeCandidate = IdentifierExpression | Expression

export default class CallExpression extends Expression {
    public nodeType: string = "CallExpression";
    public callee: CalleeCandidate
    public args: ParserNode[]
    public span: Span

    public constructor(callee: CalleeCandidate, parameters: ParserNode[], span: Span) {
        super();
        this.callee = callee
        this.args = parameters
        this.span = span
    }
}
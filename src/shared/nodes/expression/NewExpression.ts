import ParserNode from "@nodes/ParserNode";
import CallExpression from "@nodes/expression/CallExpression";
import Span from "@shared/Span";
import IdentifierExpression from "@nodes/expression/IdentifierExpression";

export default class NewExpression implements CallExpression {
    public nodeType: string = "NewStatement";
    public callee: IdentifierExpression
    public args: ParserNode[]
    public span: Span

    constructor(identifier: IdentifierExpression, parameters: ParserNode[], span: Span) {
        this.callee = identifier
        this.args = parameters
        this.span = span
    }
}
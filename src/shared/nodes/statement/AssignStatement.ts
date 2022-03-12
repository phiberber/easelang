import ParserNode from "@nodes/ParserNode";
import Span from "@shared/Span";
import Token from "@shared/Token";

export default class AssignStatement implements ParserNode {
    public nodeType: string = "AssignStatement"
    public assigned: Token<string>
    public operator: Token<string>
    public value: ParserNode
    public span: Span

    constructor(assigned: Token<string>, operator: Token<string>, value: ParserNode, span: Span) {
        this.assigned = assigned
        this.operator = operator
        this.value = value
        this.span = span
    }
}
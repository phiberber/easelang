import {ParserNode} from "../ParserNode";
import {Span} from "../../../front/Span";
import Block from "../Block";
import Token from "../../../front/lexer/Token";

export class AssignStatement implements ParserNode {

    nodeType="AssignStatement"
    assigned: Token<String>
    operator: Token<String>
    value: ParserNode
    span: Span

    constructor(assigned: Token<String>, operator: Token<String>, value: ParserNode, span: Span) {
        this.assigned = assigned
        this.operator = operator
        this.value = value
        this.span = span
    }

}
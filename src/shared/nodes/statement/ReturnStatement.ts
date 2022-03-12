import {ParserNode} from "../ParserNode";
import {Span} from "../../Span";

export class ReturnStatement implements ParserNode {
    public nodeType: string = "ReturnStatement"
    public statement: ParserNode
    public span: Span

    constructor(statement: ParserNode, span: Span) {
        this.span = span
        this.statement = statement
    }
}
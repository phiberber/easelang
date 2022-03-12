import ParserNode from "@nodes/ParserNode";
import FunctionCall from "@nodes/call/FunctionCall";
import Span from "@shared/Span";
import Token from "@shared/Token";

export default class NewStatement implements FunctionCall {
    public nodeType: string = "NewStatement";
    public identifier: Token<string>
    public parameters: ParserNode[]
    public span: Span

    constructor(identifier: Token<string>, parameters: ParserNode[], span: Span) {
        this.identifier = identifier
        this.parameters = parameters
        this.span = span
    }
}
import ParserNode from "@nodes/ParserNode";
import Token from "@shared/Token";
import Span from "@shared/Span";

export default class FunctionCall implements ParserNode {
    public nodeType: string = "FunctionCall";
    public identifier: Token<string>
    public parameters: ParserNode[]
    public span: Span

    public constructor(identifier: Token<string>, parameters: ParserNode[], span: Span) {
        this.identifier = identifier
        this.parameters = parameters
        this.span = span
    }
}
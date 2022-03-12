import {ParserNode} from "../ParserNode";
import {Span} from "../../Span";
import Token from "../../Token";

export class FunctionCall implements ParserNode {
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
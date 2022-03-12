import {ParserNode} from "../ParserNode";
import {Span} from "../../Span";
import Token from "../../Token";
import {FunctionCall} from "../call/FunctionCall";

export class NewStatement implements FunctionCall {
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
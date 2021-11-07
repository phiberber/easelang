import {ParserNode} from "../ParserNode";
import {Span} from "../../../front/Span";
import Token from "../../../front/lexer/Token";

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
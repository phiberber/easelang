import {ParserNode} from "../ParserNode";
import {Span} from "../../../front/Span";
import Block from "../Block";
import Token from "../../../front/lexer/Token";
import {FunctionCall} from "../call/FunctionCall";

export class NewStatement implements FunctionCall {

    nodeType: string = "NewStatement";
    identifier: Token<string>
    parameters: ParserNode[]
    span: Span

    constructor(identifier: Token<string>, parameters: ParserNode[], span: Span) {
        this.identifier = identifier
        this.parameters = parameters
        this.span = span
    }

}
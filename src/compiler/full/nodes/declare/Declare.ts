import {ParserNode} from "../ParserNode";
import {Span} from "../../../front/Span";
import Token from "../../../front/lexer/Token";
import {Modifiers} from "../../../front/lexer/Tag";

export abstract class Declare implements ParserNode {
    nodeType = "Declare"
    abstract identifier: Token<string>
    abstract modifiers: typeof Modifiers
    abstract span: Span
}
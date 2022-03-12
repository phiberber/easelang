import {ParserNode} from "../ParserNode";
import {Span} from "../../Span";
import Token from "../../Token";
import {Modifiers} from "../../Tag";

export abstract class Declare implements ParserNode {
    public nodeType = "Declare"
    public abstract identifier: Token<string>
    public abstract modifiers: typeof Modifiers
    public abstract span: Span
}
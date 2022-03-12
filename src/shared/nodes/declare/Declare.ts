import ParserNode from "@nodes/ParserNode";
import {Modifiers} from "@shared/Tag";
import Token from "@shared/Token";
import Span from "@shared/Span";

export default abstract class Declare implements ParserNode {
    public nodeType = "Declare"
    public abstract identifier: Token<string>
    public abstract modifiers: typeof Modifiers
    public abstract span: Span
}
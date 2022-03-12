import {ParserNode} from "../ParserNode";
import {Span} from "../../Span";
import Tag from "../../Tag";

export abstract class Expression implements ParserNode {
    public nodeType: string = "Expression"
    public abstract operator: Tag
    public abstract left: ParserNode
    public abstract right: ParserNode
    public abstract span: Span;
}
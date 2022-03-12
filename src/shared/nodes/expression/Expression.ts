import ParserNode from "@nodes/ParserNode";
import Span from "@shared/Span";
import Tag from "@shared/Tag";

export default abstract class Expression implements ParserNode {
    public nodeType: string = "Expression"
    public abstract operator: Tag
    public abstract left: ParserNode
    public abstract right: ParserNode
    public abstract span: Span;
}
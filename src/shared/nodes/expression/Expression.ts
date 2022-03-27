import ParserNode from "@nodes/ParserNode";
import Span from "@shared/Span";
import Tag from "@shared/Tag";

export default abstract class Expression implements ParserNode {
    public nodeType: string = "Expression"
    public abstract span: Span;
    public static empty: Expression = { nodeType: "Expression", span: Span.empty }
}
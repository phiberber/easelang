import ParserNode from "@nodes/ParserNode";
import Span from "@shared/Span";
import Tag from "@shared/Tag";

export default abstract class Literal<T> implements ParserNode {
    public nodeType: "Literal"
    public tag: Tag
    public name: T
    public span: Span;
}
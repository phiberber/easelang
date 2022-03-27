import ParserNode from "@nodes/ParserNode";
import Span from "@shared/Span";

export default abstract class Statement implements ParserNode {
    abstract nodeType: string;
    abstract span: Span;
}
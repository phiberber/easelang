import ParserNode from "@nodes/ParserNode";
import Span from "@shared/Span";

export default class Block implements ParserNode {
    public nodeType: string = "Block"
    public span: Span
    public content: ParserNode[] = []

    public static empty = new Block([], new Span())

    public constructor(content: ParserNode[], span: Span) {
        this.content = content
        this.span = span
    }

    public copy(): Block {
        return new Block(this.content, this.span.copy())
    }
}
import {ParserNode} from "./ParserNode";
import {Span} from "../Span";

class Block implements ParserNode {

    nodeType: string = "Block"
    span: Span
    content: ParserNode[] = []

    public constructor(content: ParserNode[], span: Span) {
        this.content = content
        this.span = span
    }

    public copy(): Block {
        return new Block(this.content, this.span.copy())
    }

}

export default Block
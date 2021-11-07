import {ParserNode} from "./ParserNode";
import {Span} from "../../front/Span";

class Block implements ParserNode {

    nodeType: string = "Block"
    span: Span
    content: ParserNode[] = []

    public constructor(content: ParserNode[], span: Span) {
        this.content = content
        this.span = span
    }

    public copy(): Block {
        const block = new Block(this.content, this.span.copy())
        return
    }

}

export default Block
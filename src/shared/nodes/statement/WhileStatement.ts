import {ParserNode} from "../ParserNode";
import {Span} from "../../Span";
import Block from "../Block";

export class WhileStatement implements ParserNode {
    public nodeType="WhileStatement"
    public condition: ParserNode
    public fallback: Block | undefined
    public block: Block
    public span: Span

    constructor(condition: ParserNode, fallback: Block | undefined = undefined, block: Block, span: Span) {
        this.condition = condition
        this.fallback = fallback
        this.block = block
        this.span = span
    }
}
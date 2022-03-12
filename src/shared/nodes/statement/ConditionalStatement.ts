import {ParserNode} from "../ParserNode";
import {Span} from "../../Span";
import Block from "../Block";

export class ConditionalStatement implements ParserNode {
    public nodeType: string = "ConditionalStatement"
    public condition: ParserNode | undefined
    public fallbacks: ConditionalStatement[]
    public block: Block
    public span: Span

    constructor(condition: ParserNode | undefined = undefined, fallbacks: ConditionalStatement[] = [], block: Block, span: Span) {
        this.condition = condition
        this.fallbacks = fallbacks
        this.block = block
        this.span = span
    }
}
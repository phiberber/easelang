import {ParserNode} from "../ParserNode";
import {Span} from "../../../front/Span";
import Block from "../Block";

export class IfStatement implements ParserNode {

    nodeType="IfStatement"
    condition: ParserNode | undefined
    fallbacks: IfStatement[]
    block: Block
    span: Span

    constructor(condition: ParserNode | undefined = undefined, fallbacks: IfStatement[] = [], block: Block, span: Span) {
        this.condition = condition
        this.fallbacks = fallbacks
        this.block = block
        this.span = span
    }

}
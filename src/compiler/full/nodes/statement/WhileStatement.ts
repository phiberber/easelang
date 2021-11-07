import {Expression} from "../expression/Expression";
import {ParserNode} from "../ParserNode";
import {Span} from "../../../front/Span";
import Block from "../Block";

export class WhileStatement implements ParserNode {

    nodeType="WhileStatement"
    condition: ParserNode
    fallback: Block | undefined
    block: Block
    span: Span

    constructor(condition: ParserNode, fallback: Block | undefined = undefined, block: Block, span: Span) {
        this.condition = condition
        this.fallback = fallback
        this.block = block
        this.span = span
    }

}
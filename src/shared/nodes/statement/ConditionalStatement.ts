import Block from "@nodes/Block";
import Span from "@shared/Span";
import Statement from "@nodes/statement/Statement";
import Expression from "@nodes/expression/Expression";

// @TODO: Switch from fallbacks to a LinkedList of ConditionalStatements, being the last one the "else" statement block.

export default class ConditionalStatement extends Statement {
    public nodeType: string = "ConditionalStatement"
    public test: Expression | undefined
    public fallbacks: ConditionalStatement[]
    public block: Block
    public span: Span

    constructor(condition: Expression | undefined = undefined, fallbacks: ConditionalStatement[] = [], block: Block, span: Span) {
        super();
        this.test = condition
        this.fallbacks = fallbacks
        this.block = block
        this.span = span
    }
}
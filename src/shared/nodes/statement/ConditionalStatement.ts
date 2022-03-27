import {BlockExpression} from "@nodes/expression/BlockExpression";
import {Span} from "@shared/Span";
import {Statement} from "@nodes/statement/Statement";
import {Expression} from "@nodes/expression/Expression";

// @TODO: Switch from fallbacks to a LinkedList of ConditionalStatements, being the last one the "else" statement block.

export class ConditionalStatement extends Statement {
    public nodeType: string = "ConditionalStatement"
    public test: Expression | undefined
    public fallbacks: ConditionalStatement[]
    public block: BlockExpression
    public span: Span

    constructor(condition: Expression | undefined = undefined, fallbacks: ConditionalStatement[] = [], block: BlockExpression, span: Span) {
        super();
        this.test = condition
        this.fallbacks = fallbacks
        this.block = block
        this.span = span
    }
}
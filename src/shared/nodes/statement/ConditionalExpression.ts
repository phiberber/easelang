import {BlockExpression} from "@nodes/expression/BlockExpression";
import {Span} from "@shared/Span";
import {Expression} from "@nodes/expression/Expression";

// @TODO: Switch from fallbacks to a LinkedList of ConditionalExpression, being the last one the "else" statement block.

export class ConditionalExpression extends Expression {
    public nodeType: string = "ConditionalExpression"
    public test: Expression | undefined
    public fallbacks: ConditionalExpression[]
    public block: BlockExpression
    public span: Span

    constructor(condition: Expression | undefined = undefined, fallbacks: ConditionalExpression[] = [], block: BlockExpression, span: Span) {
        super();
        this.test = condition
        this.fallbacks = fallbacks
        this.block = block
        this.span = span
    }
}
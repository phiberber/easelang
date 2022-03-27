import {BlockExpression} from "@nodes/expression/BlockExpression";
import {Span} from "@shared/Span";
import {Statement} from "@nodes/statement/Statement";
import {Expression} from "@nodes/expression/Expression";

export class WhileStatement extends Statement {
    public nodeType="WhileStatement"
    public condition: Expression
    public fallback: BlockExpression | undefined
    public block: BlockExpression
    public span: Span

    constructor(condition: Expression, fallback: BlockExpression | undefined = undefined, block: BlockExpression, span: Span) {
        super();
        this.condition = condition
        this.fallback = fallback
        this.block = block
        this.span = span
    }
}
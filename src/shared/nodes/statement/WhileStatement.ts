import Block from "@nodes/Block";
import Span from "@shared/Span";
import Statement from "@nodes/statement/Statement";
import Expression from "@nodes/expression/Expression";

export default class WhileStatement extends Statement {
    public nodeType="WhileStatement"
    public condition: Expression
    public fallback: Block | undefined
    public block: Block
    public span: Span

    constructor(condition: Expression, fallback: Block | undefined = undefined, block: Block, span: Span) {
        super();
        this.condition = condition
        this.fallback = fallback
        this.block = block
        this.span = span
    }
}
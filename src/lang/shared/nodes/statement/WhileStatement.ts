import {BlockExpression} from "@/lang/shared/nodes/expression/BlockExpression";
import {Span} from "@/lang/shared/Span";
import {Statement} from "@/lang/shared/nodes/statement/Statement";
import {Expression} from "@/lang/shared/nodes/expression/Expression";

export class WhileStatement extends Statement {

    public readonly test: Expression
    public readonly fallback: BlockExpression | undefined
    public readonly body: BlockExpression

    public constructor(test: Expression, fallback: BlockExpression | undefined = undefined, block: BlockExpression, span: Span) {
        super(span);
        this.test = test
        this.fallback = fallback
        this.body = block
    }

}
import {BlockExpression} from "@/lang/shared/nodes/expression/BlockExpression";
import {Span} from "@/lang/shared/Span";
import {Expression} from "@/lang/shared/nodes/expression/Expression";

type ConditionalTest = Expression | undefined
type ConditionalAlternate = ConditionalExpression | undefined

export class ConditionalExpression extends Expression {

    public readonly test: ConditionalTest
    public readonly consequent: BlockExpression
    public alternate: ConditionalAlternate

    constructor(condition: ConditionalTest, alternate: ConditionalAlternate, block: BlockExpression, span: Span) {
        super(span);
        this.test = condition
        this.alternate = alternate
        this.consequent = block
    }
}
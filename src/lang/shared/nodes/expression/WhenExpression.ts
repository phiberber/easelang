import {Span} from "@/lang/shared/Span";
import {Expression} from "@/lang/shared/nodes/expression/Expression";
import {Statement} from "@/lang/shared/nodes/statement/Statement";

export class WhenCase extends Statement {

    public readonly test: Expression | undefined
    public readonly body: Expression

    public constructor(condition: Expression | undefined, content: Expression, span: Span) {
        super(span)
        this.test = condition
        this.body = content
    }

}

export class WhenExpression extends Expression {

    public readonly discriminant: Expression
    public readonly cases: WhenCase[] = []

    public constructor(discriminant: Expression, cases: WhenCase[], span: Span) {
        super(span)
        this.discriminant = discriminant
        this.cases = cases
    }

}
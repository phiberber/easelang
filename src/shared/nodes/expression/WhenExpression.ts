import {Span} from "@shared/Span";
import {Expression} from "@nodes/expression/Expression";
import {Statement} from "@nodes/statement/Statement";

export class WhenCase extends Statement {

    public nodeType: string = "WhenCondition"
    public condition: Expression | undefined
    public body: Expression
    public span: Span

    public constructor(condition: Expression | undefined, content: Expression, span: Span) {
        super()
        this.condition = condition
        this.body = content
        this.span = span
    }

}

export class WhenExpression extends Expression {

    public nodeType: string = "WhenExpression"
    public span: Span
    public discriminant: Expression
    public cases: WhenCase[] = []

    public constructor(discriminant: Expression, cases: WhenCase[], span: Span) {
        super()
        this.discriminant = discriminant
        this.cases = cases
        this.span = span
    }

}
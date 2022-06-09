import {Span} from "@/lang/shared/Span";
import {Expression} from "@/lang/shared/nodes/expression/Expression";

export class ArrayExpression extends Expression {

    public readonly elements: Expression[]

    constructor(elements: Expression[], span: Span) {
        super(span);
        this.elements = elements
    }

}
import {Span} from "@/lang/shared/Span";
import {Tag} from "@/lang/shared/Tag";
import {Expression} from "@/lang/shared/nodes/expression/Expression";

export abstract class LiteralExpression<T> extends Expression {

    public readonly tag: Tag
    public readonly value: T

    protected constructor(tag: Tag, value: T, span: Span) {
        super(span);
        this.tag = tag
        this.value = value
    }

    public copy() {
        return new (this.constructor as any)(this.tag, this.value, this.span.copy());
    }

}
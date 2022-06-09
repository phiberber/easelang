import {BaseNode} from "@/lang/shared/nodes/BaseNode";
import {Span} from "@/lang/shared/Span";
import {Expression} from "@/lang/shared/nodes/expression/Expression";

export class BlockExpression extends Expression {

    public readonly content: BaseNode[] = []

    public static empty = new BlockExpression([], new Span())

    public constructor(content: BaseNode[], span: Span) {
        super(span)
        this.content = content
    }

}
import {ParserNode} from "@nodes/ParserNode";
import {Span} from "@shared/Span";
import {Expression} from "@nodes/expression/Expression";

export class BlockExpression extends Expression {
    public nodeType: string = "Block"
    public span: Span
    public content: ParserNode[] = []

    public static empty = new BlockExpression([], new Span())

    public constructor(content: ParserNode[], span: Span) {
        super()
        this.content = content
        this.span = span
    }

    public copy(): BlockExpression {
        return new BlockExpression(this.content, this.span.copy())
    }
}
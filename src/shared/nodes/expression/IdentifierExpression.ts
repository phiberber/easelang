import ParserNode from "@nodes/ParserNode";
import Span from "@shared/Span";

export default class IdentifierExpression implements ParserNode {

    public nodeType: string = "IdentifierExpression";
    public span: Span;
    public value: string;

    public static empty = new IdentifierExpression("")

    public constructor(value: string, span: Span = Span.empty) {
        this.value = value;
        this.span = span;
    }

    public copy(): IdentifierExpression {
        return new IdentifierExpression(this.value, this.span);
    }
}
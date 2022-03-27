import ParserNode from "@nodes/ParserNode";
import Span from "@shared/Span";
import Tag from "@shared/Tag";
import Expression from "@nodes/expression/Expression";

export default abstract class LiteralExpression<T> extends Expression {
    public nodeType = "LiteralExpression"
    public abstract tag: Tag
    public abstract value: T
    public abstract span: Span;
}
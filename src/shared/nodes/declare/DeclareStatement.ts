import Span from "@shared/Span";
import IdentifierExpression from "@nodes/expression/IdentifierExpression";
import Statement from "@nodes/statement/Statement";

export default abstract class DeclareStatement extends Statement {
    public nodeType = "DeclareStatement"
    public abstract identifier: IdentifierExpression
    public abstract span: Span
}
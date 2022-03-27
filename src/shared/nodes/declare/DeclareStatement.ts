import {IdentifierExpression} from "@nodes/expression/IdentifierExpression";
import {Span} from "@shared/Span";
import {Statement} from "@nodes/statement/Statement";

export abstract class DeclareStatement extends Statement {
    public nodeType = "DeclareStatement"
    public abstract identifier: IdentifierExpression
    public abstract span: Span
}
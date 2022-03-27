import {BlockExpression} from "@nodes/expression/BlockExpression";
import {Expression} from "@nodes/expression/Expression";
import {IdentifierExpression} from "@nodes/expression/IdentifierExpression";
import {Span} from "@shared/Span";
import {Tag, Modifiers} from "@shared/Tag";
import {VariableStatement} from "@nodes/declare/VariableStatement";

export type FunctionModifiers = typeof Modifiers

export class ParameterStatement extends VariableStatement {
    public identifier: IdentifierExpression;
    public span: Span;
    public initializer: Expression
    public optional: Boolean

    constructor(identifier: IdentifierExpression, initializer: Expression = Expression.empty, optional: Boolean = false, span: Span = Span.empty) {
        super(Tag.Constant, identifier, initializer, span);
        this.identifier = identifier
        this.initializer = initializer
        this.optional = optional
        this.span = span
    }

    toString() {
        return `${this.identifier.value}${this.optional ? "?" : ""}${this.initializer ? ` = ${this.initializer.toString()}` : ""}`
    }
}

export class FunctionExpression extends Expression {
    public nodeType = "FunctionExpression"
    public identifier: IdentifierExpression
    public parameters: ParameterStatement[]
    public content: BlockExpression
    public span: Span;

    constructor(identifier: IdentifierExpression, parameters: ParameterStatement[] = [], content: BlockExpression = BlockExpression.empty, span: Span = Span.empty) {
        super();
        this.identifier = identifier
        this.parameters = parameters
        this.content = content
        this.span = span
    }

    toString() {
        return `${this.identifier.value}(${this.parameters.map(parameter => parameter.toString()).join(',')})`
    }
}
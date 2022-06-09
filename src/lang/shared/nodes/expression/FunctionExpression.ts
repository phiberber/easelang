import {BlockExpression} from "@/lang/shared/nodes/expression/BlockExpression";
import {Expression} from "@/lang/shared/nodes/expression/Expression";
import {IdentifierLiteral} from "@/lang/shared/nodes/literal/IdentifierLiteral";
import {Span} from "@/lang/shared/Span";
import {Tag} from "@/lang/shared/Tag";
import {VariableStatement} from "@/lang/shared/nodes/declare/VariableStatement";

export class ParameterStatement extends VariableStatement {

    public readonly optional: boolean

    constructor(identifier: IdentifierLiteral, initializer: Expression | undefined, optional: boolean = false, span: Span = Span.empty) {
        super(Tag.Constant, identifier, initializer, span);
        this.optional = optional
    }

}

export class FunctionExpression extends Expression {

    public readonly identifier: IdentifierLiteral
    public readonly parameters: ParameterStatement[]
    public readonly body: BlockExpression

    constructor(identifier: IdentifierLiteral, params: ParameterStatement[] = [], body: BlockExpression = BlockExpression.empty, span: Span = Span.empty) {
        super(span);
        this.identifier = identifier
        this.parameters = params
        this.body = body
    }

}
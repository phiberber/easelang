import {DeclareStatement} from "@/lang/shared/nodes/declare/DeclareStatement";
import {Expression} from "@/lang/shared/nodes/expression/Expression";
import {IdentifierLiteral} from "@/lang/shared/nodes/literal/IdentifierLiteral";
import {Span} from "@/lang/shared/Span";
import {Tag} from "@/lang/shared/Tag";

type VariableKind = typeof Tag.Variable | typeof Tag.Value | typeof Tag.Constant

export class VariableStatement extends DeclareStatement {

    public readonly kind: VariableKind
    public readonly initializer: Expression | undefined

    constructor(kind: VariableKind, identifier: IdentifierLiteral, value: Expression | undefined = undefined, span: Span = Span.empty) {
        super(identifier, span)
        this.kind = kind
        this.initializer = value
    }

}
import {IdentifierLiteral} from "@/lang/shared/nodes/literal/IdentifierLiteral";
import {Span} from "@/lang/shared/Span";
import {Statement} from "@/lang/shared/nodes/statement/Statement";

export abstract class DeclareStatement extends Statement {

    public readonly identifier: IdentifierLiteral

    protected constructor(identifier: IdentifierLiteral, span: Span) {
        super(span);
        this.identifier = identifier
    }

}
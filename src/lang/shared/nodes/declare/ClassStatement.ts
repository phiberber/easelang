import {DeclareStatement} from "@/lang/shared/nodes/declare/DeclareStatement";
import {BlockExpression} from "@/lang/shared/nodes/expression/BlockExpression";
import {Span} from "@/lang/shared/Span";
import {IdentifierLiteral} from "@/lang/shared/nodes/literal/IdentifierLiteral";

export class ClassStatement extends DeclareStatement {

    public readonly body: BlockExpression

    constructor(identifier: IdentifierLiteral, content: BlockExpression, span: Span) {
        super(identifier, span);
        this.body = content
    }

}
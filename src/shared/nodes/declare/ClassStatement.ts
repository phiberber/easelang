import {DeclareStatement} from "@nodes/declare/DeclareStatement";
import {BlockExpression} from "@nodes/expression/BlockExpression";
import {Span} from "@shared/Span";
import {IdentifierExpression} from "@nodes/expression/IdentifierExpression";

export class ClassStatement extends DeclareStatement {
    public nodeType = "ClassStatement"
    public identifier: IdentifierExpression
    public content: BlockExpression
    public span: Span;

    constructor(identifier: IdentifierExpression, content: BlockExpression, span: Span) {
        super();
        this.identifier = identifier
        this.content = content
        this.span = span
    }

    toString() {
        return `class ${this.identifier.value}:`
    }
}
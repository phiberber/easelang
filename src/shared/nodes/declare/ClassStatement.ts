import DeclareStatement from "@nodes/declare/DeclareStatement";
import Block from "@nodes/Block";
import Span from "@shared/Span";
import IdentifierExpression from "@nodes/expression/IdentifierExpression";

export default class ClassStatement extends DeclareStatement {
    public nodeType = "ClassStatement"
    public identifier: IdentifierExpression
    public content: Block
    public span: Span;

    constructor(identifier: IdentifierExpression, content: Block, span: Span) {
        super();
        this.identifier = identifier
        this.content = content
        this.span = span
    }

    toString() {
        return `class ${this.identifier.value}:`
    }
}
import {Span} from "@shared/Span";
import {Token} from "@shared/Token";
import {Statement} from "@nodes/statement/Statement";

export class ImportStatement extends Statement {
    public nodeType = "ImportStatement"
    public imported: Token<string>[]
    public module: Token<string>
    public span: Span

    constructor(imported: Token<string>[], module: Token<string>, span: Span) {
        super();
        this.imported = imported
        this.module = module
        this.span = span
    }
}
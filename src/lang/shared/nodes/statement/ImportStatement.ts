import {Span} from "@/lang/shared/Span";
import {Token} from "@/lang/shared/Token";
import {Statement} from "@/lang/shared/nodes/statement/Statement";

export class ImportStatement extends Statement {

    public readonly imported: Token<string>[]
    public readonly module: Token<string>

    constructor(imported: Token<string>[], module: Token<string>, span: Span) {
        super(span);
        this.imported = imported
        this.module = module
    }

}
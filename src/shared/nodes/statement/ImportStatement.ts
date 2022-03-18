import ParserNode from "@nodes/ParserNode";
import Span from "@shared/Span";
import Token from "@shared/Token";

export default class ImportStatement implements ParserNode {

    public nodeType="ImportStatement"
    public imported: Token<string>[]
    public module: Token<string>
    public span: Span

    constructor(imported: Token<string>[], module: Token<string>, span: Span) {
        this.imported = imported
        this.module = module
        this.span = span
    }
}
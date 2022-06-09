import {ImportStatement} from "@/lang/shared/nodes/statement/ImportStatement";
import {Parser} from "@/lang/front/parser/Parser";
import {Tag} from "@/lang/shared/Tag";
import {Token} from "@/lang/shared/Token";

export function parseImport(this: Parser): ImportStatement {

    const start = this.match(Tag.Import)

    /**
     * This is a work in progress
     * The import syntax needs to be better thought, but this will be of good use by now.
     */

    const imported: Token<string>[] = []
    let module

    while(this.accept(Tag.Identifier) && this.span.line == start.span.line) {
        imported.push(this.match(Tag.Identifier))
        this.skip(Tag.Comma)
    }

    if(this.accept(Tag.From)) {
        this.match(Tag.From)
        module = this.match([Tag.Identifier, Tag.String])
    } else module = imported[imported.length - 1]

    const importSpan = start.span.expand(module.span)
    return new ImportStatement(imported, module, importSpan)

}
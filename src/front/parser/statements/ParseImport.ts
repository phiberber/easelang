import Parser from "@front/parser/Parser";
import Tag from "@shared/Tag";
import Token from "@shared/Token";
import ImportStatement from "@nodes/statement/ImportStatement";

export default function parseImport(this: Parser) {

    const start = this.match(Tag.Import)

    /**
     * This is a work in progress
     * The import syntax needs to be better thought, but this will be of good use by now.
     */

    const imported: Token<string>[] = []

    while(!this.accept(Tag.From)) {
        imported.push(this.match(Tag.Identifier))
        this.skip(Tag.Comma)
    }

    this.match(Tag.From)

    const module = this.match([Tag.Identifier, Tag.String])

    const importSpan = start.span.copy().expandEnd(module.span)
    return new ImportStatement(imported, module, importSpan)

}
import {parseStatement} from "@front/parser/statements/ParseStatement";
import {ParserNode} from "@nodes/ParserNode";
import {Parser} from "@front/parser/Parser";
import {BlockExpression} from "@nodes/expression/BlockExpression";
import {Tag} from "@shared/Tag";

export function parseBlock(this: Parser, restriction: "Declare" | "" = ""): BlockExpression {

    const startMatch = this.skip([Tag.OpenBraces, Tag.Colon])
    const startSpan = startMatch ? startMatch.span : this.span
    const statements: ParserNode[] = []

    do {
        const innerStatement = parseStatement.call(this)
        if(!innerStatement) break
        if(restriction && innerStatement.nodeType !== restriction) {
            this.raise(`You can only use ${restriction} statements in this scope`)
        }
        statements.push(innerStatement)
    } while (startMatch?.tag !== Tag.Colon && !this.accept(Tag.CloseBraces))

    this.skip(Tag.CloseBraces)

    const blockSpan = startSpan.copy().expandEnd(this.span)
    return new BlockExpression(statements, blockSpan)
}

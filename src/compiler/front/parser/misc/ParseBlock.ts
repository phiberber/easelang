import Parser from "../Parser";
import Block from "../../../full/nodes/Block";
import Tag from "../../lexer/Tag";
import {ParserNode} from "../../../full/nodes/ParserNode";
import {parseStatement} from "../statements/ParseStatements";

export function parseBlock(this: Parser, restriction: "Declare" | "" = ""): Block {
    const startMatch = this.skip(Tag.Colon)
    const startSpan = startMatch ? startMatch.span : this.span
    const statements: ParserNode[] = []
    if(startMatch) {
        const sameLine = () => startSpan.line === this.look.span.line
        const higherIndentation = () => this.look.span.indentation > startSpan.indentation
        while (this.look && (sameLine() || higherIndentation())) {
            const innerStatement = parseStatement.call(this)
            if(!innerStatement) break
            if(restriction && innerStatement.nodeType !== restriction) {
                this.raise(`You can only use ${restriction} Statements in this scope`)
            }
            statements.push(innerStatement)
        }
    }
    const blockSpan = startSpan.copy().expandEnd(this.span)
    return new Block(statements, blockSpan)
}

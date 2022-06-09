import {parseStatement} from "@/lang/front/parser/statements/ParseStatement";
import {BaseNode} from "@/lang/shared/nodes/BaseNode";
import {Parser} from "@/lang/front/parser/Parser";
import {BlockExpression} from "@/lang/shared/nodes/expression/BlockExpression";
import {Tag} from "@/lang/shared/Tag";
import {Token} from "@/lang/shared/Token";
import {Statement} from "@/lang/shared/nodes/statement/Statement";

type BlockType = "indentation" | "braces"

export interface BlockParserOptions {
    startMatch?: Token
    contentFilter?: (statement: Statement) => boolean
}

export function parseBlock(this: Parser, options: BlockParserOptions = {}): BlockExpression {
    const startMatch = options.startMatch ?? this.skip([Tag.OpenBraces, Tag.Colon])

    if (!startMatch) return this.raise("Could not find block start token")

    const startSpan = startMatch.span
    const startTag = startMatch.tag
    let blockType: BlockType

    if (startTag === Tag.Colon) blockType = "indentation"
    else if (startTag === Tag.OpenBraces) blockType = "braces"
    else this.raise(`Unexpected block type: ${startMatch}`)

    const nodes: BaseNode[] = []

    do {
        const node = parseStatement.call(this)
        if (node === undefined) break
        if (options.contentFilter && !options.contentFilter.call(this, node)) continue
        nodes.push(node)
    } while (blockType === "braces" && !this.skip(Tag.CloseBraces))

    const blockSpan = startSpan.expand(this.span)
    return new BlockExpression(nodes, blockSpan)
}

import {ClassStatement} from "@/lang/shared/nodes/declare/ClassStatement";
import {parseBlock} from "@/lang/front/parser/misc/ParseBlock";
import {parseIdentifier} from "@/lang/front/parser/expressions/ParseIdentifier";
import {Parser} from "@/lang/front/parser/Parser";
import {Tag} from "@/lang/shared/Tag";

export function parseClassDeclaration(this: Parser): ClassStatement {
    const startMatch = this.match(Tag.Class)
    const className = parseIdentifier.call(this)
    const block = parseBlock.call(this)
    return new ClassStatement(className, block, startMatch.span.expand(block.span))
}
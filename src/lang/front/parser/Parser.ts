import {AbstractParseTree} from "@/lang/shared/nodes/AbstractParseTree";
import {ParserContext} from "@/lang/front/parser/ParserContext";
import {BaseNode} from "@/lang/shared/nodes/BaseNode";
import {parseStatement} from "@/lang/front/parser/statements/ParseStatement";
import {ProcessResult} from "@/lang/front/ProcessResult";
import {Span} from "@/lang/shared/Span";
import {Tag} from "@/lang/shared/Tag";
import {Token} from "@/lang/shared/Token";

export class Parser implements ParserContext {

    public look: Token
    public content: Token[]
    public span: Span

    public constructor(tokens: Token[]) {
        this.content = tokens
        this.look = this.content[0]
        this.span = new Span(0, 0, this.content.length - 1, 0)
    }

    public perform(this: Parser): ProcessResult<AbstractParseTree> {

        const content = this.content
        const nodes: BaseNode[] = []
        const startTime = new Date().getTime()

        while (this.look) {
            const statement = parseStatement.call(this)
            if (!statement && this.look) this.raise("Unable to parse statement " + this.look.tag.content)
            if (statement) nodes.push(statement)
        }

        const astSpan = new Span(0, 0, content.length - 1, 0)
        const ast = new AbstractParseTree(nodes, astSpan)

        return {
            time: new Date().getTime() - startTime,
            result: ast
        }
    }

    accept(tag: Tag | Tag[]): boolean {
        if (!this.look) return false
        if (this.ignorable(tag)) return false
        if (Array.isArray(tag)) return tag.includes(this.look.tag)
        return this.look.tag === tag
    }

    expect(tag: Tag | Tag[], lookAhead: number = 1): boolean {
        if (this.span.index + lookAhead > this.span.end) return false
        if (this.ignorable(tag)) return false
        if (Array.isArray(tag)) return tag.includes(this.content[this.span.index + lookAhead]?.tag!!)
        return this.content[this.span.index + lookAhead]?.tag === tag
    }

    match(tag: Tag | Tag[]): Token {
        if (!this.accept(tag)) {
            this.raise(`Expected ${Array.isArray(tag) ? "any of " + tag.map(tag => tag.symbol.description).join(",") : "a(an) " + tag.symbol.description}, received a ${this.look?.tag?.symbol?.description} (${this.look?.content})`)
            return this.look
        }
        const look = this.look
        this.next()
        return look
    }

    next(amount: number = 1): Token {
        this.span.index += amount
        this.look = this.content[this.span.index]
        if (this.look) {
            this.span.line = this.look.span.line
            this.span.indentation = this.look.span.indentation
        }
        return this.look
    }

    ignorable(tag: Tag | Tag[]): boolean {
        return tag === Tag.Space;
    }

    skip(tag: Tag | Tag[]): Token | undefined {
        return this.accept(tag) ? this.match(tag) : undefined
    }

    raise(error: string): never {
        throw new SyntaxError(`${error}, occurred at line:column ${this.span.line}:${this.span.index}`)
    }

}
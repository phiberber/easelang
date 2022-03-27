import {AbstractParseTree} from "@nodes/AbstractParseTree";
import {ParserContext} from "@front/parser/ParserContext";
import {ParserNode} from "@nodes/ParserNode";
import {parseStatement} from "@front/parser/statements/ParseStatement";
import {ProcessResult} from "@front/ProcessResult";
import {Span} from "@shared/Span";
import {Tag} from "@shared/Tag";
import {Token} from "@shared/Token";

export class Parser implements ParserContext {
    public look: Token
    public content: Token[]
    public span: Span

    public constructor(tokens: Token[]) {
        this.content = tokens
        this.look = this.content[0]
        this.span = new Span(0, 0, this.content.length - 1, 0)
    }

    public perform(): ProcessResult<AbstractParseTree> {
        const startTime = new Date().getTime()
        const nodes: ParserNode[] = []

        while (this.look) {
            const statement = parseStatement.call(this)
            if(!statement && this.look) this.raise("Unable to parse statement " + this.look.tag.content)
            if(statement) nodes.push(statement)
        }

        return {
            time: new Date().getTime() - startTime,
            result: {
                nodeType: "Program",
                span: new Span(0, 0, this.content.length - 1, 0),
                body: nodes
            }
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
        if (Array.isArray(tag)) return tag.includes(this.content[this.span.index + lookAhead]?.tag)
        return this.content[this.span.index + lookAhead]?.tag === tag
    }

    ignorable(tag: Tag | Tag[]): boolean {
        return tag === Tag.Space;
    }

    skip(tag: Tag | Tag[]): Token | undefined {
        return this.accept(tag) ? this.match(tag) : undefined
    }

    match(tag: Tag | Tag[]): Token {
        if (!this.accept(tag)) {
            this.raise(`Expected ${Array.isArray(tag) ? "any of " + tag.map(tag => tag.symbol.description).join(",") : "a(an) " + tag.symbol.description }, received a ${this.look.tag.symbol.description}`)
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

    raise(error: string): never {
        throw new SyntaxError(`${error}, occurred at line:column ${this.span.line}:${this.span.index}`)
    }
}
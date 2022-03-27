import {Token} from "@shared/Token";
import {Span} from "@shared/Span";
import {Tag} from "@shared/Tag";

export interface ParserContext {
    look: Token
    content: Token[]
    span: Span

    accept(tag: Tag | Tag[]): boolean
    expect(tag: Tag | Tag[], lookAhead: number): boolean
    ignorable(tag: Tag | Tag[]): boolean
    match(tag: Tag | Tag[]): Token
    next(amount: number): Token
    raise(error: String | Error): never
}
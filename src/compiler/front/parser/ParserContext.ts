import Token from "../lexer/Token";
import {Span} from "../Span";
import Tag from "../lexer/Tag";

export default interface ParserContext {

    look: Token<any>

    content: Token<any>[]
    span: Span

    left(): number

    accept(tag: Tag | Tag[]): boolean
    expect(tag: Tag | Tag[], lookAhead: number): boolean

    ignorable(tag: Tag | Tag[]): boolean

    match(tag: Tag | Tag[]): Token<any>
    next(amount: number): Token<any>

    raise(error): unknown

}
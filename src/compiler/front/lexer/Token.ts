import {Span} from "../Span";
import Tag from "./Tag";

export class Token<T, E = Tag> {

    content: T
    source: string
    span: Span
    tag: E

    public constructor(content: T, source: string, span: Span, tag: E) {
        this.content = content
        this.source = source
        this.span = span
        this.tag = tag
    }

    public copy(): Token<T, E> {
        return new Token<T, E>(this.content, this.source, this.span.copy(), this.tag)
    }

}

export default Token
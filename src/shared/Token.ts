import Span from "@shared/Span";
import Tag from "@shared/Tag";

export class Token<T = any, E = Tag> {
    public content: T
    public source: string
    public span: Span
    public tag: E

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
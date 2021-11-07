import {Span} from "../Span";
import Tag from "./Tag";

export class Token<T, E = Tag> {

    content: T
    source: string
    span: Span
    tag: E

    public constructor(content: T, source: string, span: Span, tag: Tag) {
        this.content = content
        this.source = source
        this.span = span
        this.tag = tag
    }

    public copy(): Token<T> {
        return new Token<T>(this.content, this.source, this.span.copy(), this.tag)
    }

}

export default Token
import {Span} from "@/lang/shared/Span";

export class BaseNode {

    public readonly type!: string
    public readonly span: Span

    constructor(span: Span) {
        this.type = this.constructor.name
        this.span = span
    }

}
export class Span {

    public index: number = 0
    public line: number = 0
    public indentation: number = 0
    public end: number = 0

    public static empty = new Span()

    constructor(index: number = 0, line: number = 0, end: number = 0, indentation: number = 0) {
        this.index = index
        this.line = line
        this.end = end
        this.indentation = indentation
    }

    public expand(base: Span): Span {
        const expandedStart = base.index < this.index ? base : this
        const expandedEnd = base.index > this.index ? base : this
        return new Span(expandedStart.index, expandedStart.line, expandedEnd.end, expandedStart.indentation)
    }

    public copy(this: Span): Span {
        let span = new Span()
        return Object.assign(span, this)
    }
}
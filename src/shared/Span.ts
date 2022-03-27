export default class Span {
    public index: number = 0
    public line: number = 0
    public end: number = 0
    public indentation: number = 0

    public static empty = new Span()

    constructor(index: number = 0, line: number = 0, end: number = 0, indentation: number = 0) {
        this.index = index
        this.line = line
        this.end = end
        this.indentation = indentation
    }

    public expandStart(base: Span): Span {
        this.indentation = this.line < base.line ? this.indentation : base.indentation
        this.line = Math.min(base.line, this.line)
        this.index = Math.min(base.index, this.index)
        return this
    }

    public expandEnd(base: Span): Span {
        this.end = Math.max(base.end, this.end)
        return this
    }

    public copy() {
        let span = new Span()
        return Object.assign(span, this)
    }
}
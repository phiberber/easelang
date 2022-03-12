import {Span} from "../../shared/Span";

export type LexerCode = {
    rawCode: string,
    lowerCaseCode: string
}

export default interface LexerContext {
    code: LexerCode
    span: Span
}
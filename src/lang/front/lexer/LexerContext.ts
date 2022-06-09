import type {Span} from "@/lang/shared/Span";

export type LexerCode = {
    rawCode: string,
    lowerCaseCode: string
}

export interface LexerContext {
    code: LexerCode
    span: Span
}
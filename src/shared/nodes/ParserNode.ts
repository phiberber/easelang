import {Span} from "@shared/Span";

export interface ParserNode {
    nodeType: string,
    span: Span,
}
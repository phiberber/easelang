import {Span} from "../Span";

export interface ParserNode {
    nodeType: string,
    span: Span,
}
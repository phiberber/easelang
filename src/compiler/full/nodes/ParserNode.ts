import {Span} from "../../front/Span";

export interface ParserNode {
    nodeType: string,
    span: Span,
}
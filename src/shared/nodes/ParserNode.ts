import Span from "@shared/Span";

export default interface ParserNode {
    nodeType: string,
    span: Span,
}
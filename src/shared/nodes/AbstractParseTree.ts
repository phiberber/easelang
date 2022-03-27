import {ParserNode} from "@nodes/ParserNode";
import {Span} from "@shared/Span";

export interface AbstractParseTree extends ParserNode {
    nodeType: 'Program' | 'Module' | 'Script',
    span: Span,
    body: ParserNode[]
}
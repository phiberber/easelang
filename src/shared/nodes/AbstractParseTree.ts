import {ParserNode} from "./ParserNode";
import {Span} from "../Span";

export interface AbstractParseTree extends ParserNode {
    nodeType: 'Program' | 'Module' | 'Script',
    span: Span,
    body: ParserNode[]
}
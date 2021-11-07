import {ParserNode} from "./ParserNode";
import {Span} from "../../front/Span";

export interface AbstractParseTree extends ParserNode {
    nodeType: 'Program' | 'Module' | 'Script',
    span: Span,
    body: ParserNode[]
}
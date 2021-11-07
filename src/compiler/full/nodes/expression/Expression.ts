import {ParserNode} from "../ParserNode";
import {Span} from "../../../front/Span";
import Tag from "../../../front/lexer/Tag";

export abstract class Expression implements ParserNode {
    nodeType = "Expression"
    abstract operator: Tag
    abstract left: ParserNode
    abstract right: ParserNode
    abstract span: Span;
}
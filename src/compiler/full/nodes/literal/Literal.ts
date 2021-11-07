import {ParserNode} from "../ParserNode";
import {Span} from "../../../front/Span";
import Tag from "../../../front/lexer/Tag";

export abstract class Literal<T> implements ParserNode {
    nodeType: "Literal"
    tag: Tag
    name: T
    abstract span: Span;
}
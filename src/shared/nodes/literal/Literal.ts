import {ParserNode} from "../ParserNode";
import {Span} from "../../Span";
import Tag from "../../Tag";

export abstract class Literal<T> implements ParserNode {
    public nodeType: "Literal"
    public tag: Tag
    public name: T
    public span: Span;
}
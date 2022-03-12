import {Literal} from "./Literal";
import {Span} from "../../Span";
import {ParserNode} from "../ParserNode";

export class AccessedLiteral<T> extends Literal<string> {
    public name: string
    public node: ParserNode
    public span: Span;

    constructor(name: string, node: ParserNode, span: Span) {
        super();
        this.name = name
        this.node = node
        this.span = span
    }
}
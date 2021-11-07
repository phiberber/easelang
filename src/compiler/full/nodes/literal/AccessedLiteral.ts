import {Literal} from "./Literal";
import {Span} from "../../../front/Span";
import Tag from "../../../front/lexer/Tag";
import {ParserNode} from "../ParserNode";

export class AccessedLiteral<T> extends Literal<string> {

    name: string
    node: ParserNode

    span: Span;

    constructor(name: string, node: ParserNode, span: Span) {
        super();
        this.name = name
        this.node = node
        this.span = span
    }


}
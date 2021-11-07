import {Expression} from "../expression/Expression";
import {ParserNode} from "../ParserNode";
import {Span} from "../../../front/Span";
import Block from "../Block";

export class ReturnStatement implements ParserNode {

    nodeType="ReturnStatement"
    statement: ParserNode
    span: Span

    constructor(statement: ParserNode, span: Span) {
        this.span = span
        this.statement = statement
    }

}
import {Span} from "../../../front/Span";
import {Declare} from "./Declare";
import {Expression} from "../expression/Expression";
import {Literal} from "../literal/Literal";
import Block from "../Block";
import Token from "../../../front/lexer/Token";
import {Modifiers} from "../../../front/lexer/Tag";

export class DeclareClass extends Declare {

    type: Symbol | undefined;
    modifiers: typeof Modifiers = []
    identifier: Token<string>;
    content: Block
    span: Span;

    constructor(identifier: Token<string>, content: Block, modifiers: typeof Modifiers, span: Span) {
        super();
        this.identifier = identifier
        this.content = content
        this.modifiers = modifiers
        this.span = span
    }

    toString() {
        return `${this.identifier.content}:`
    }


}
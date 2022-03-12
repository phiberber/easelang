import Declare from "@nodes/declare/Declare";
import {Modifiers} from "@shared/Tag";
import Token from "@shared/Token";
import Block from "@nodes/Block";
import Span from "@shared/Span";

export default class DeclareClass extends Declare {
    public type: Symbol | undefined;
    public modifiers: typeof Modifiers = []
    public identifier: Token<string>;
    public content: Block
    public span: Span;

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
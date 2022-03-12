import {Span} from "../../Span";
import {Declare} from "./Declare";
import Block from "../Block";
import Token from "../../Token";
import {Modifiers} from "../../Tag";

export class DeclareClass extends Declare {
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
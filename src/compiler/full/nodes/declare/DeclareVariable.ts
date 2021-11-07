import {Span} from "../../../front/Span";
import {ParserNode} from "../ParserNode";
import {Declare} from "./Declare";
import Token from "../../../front/lexer/Token";
import Tag, {Modifiers} from "../../../front/lexer/Tag";

type VariableType = typeof Tag.Variable | typeof Tag.Value | typeof Tag.Constant

export class DeclareVariable extends Declare {

    type: VariableType
    identifier: Token<string>;
    modifiers: typeof Modifiers;
    valueType: Token<string> | undefined
    valueNode: ParserNode
    span: Span;

    constructor(modifiers: typeof Modifiers, type: VariableType, identifier: Token<string>, valueType: Token<string> | undefined, valueNode: ParserNode, span: Span) {
        super()
        this.type = type
        this.modifiers = modifiers
        this.identifier = identifier
        this.valueType = valueType
        this.valueNode = valueNode
        this.span = span
    }

    toString() {
        return `${this.identifier.content}=[${this.valueNode.nodeType}]`
    }

}
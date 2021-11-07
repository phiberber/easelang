import {Span} from "../../../front/Span";
import {Declare} from "./Declare";
import {Expression} from "../expression/Expression";
import {Literal} from "../literal/Literal";
import Block from "../Block";
import Token from "../../../front/lexer/Token";
import {Modifiers} from "../../../front/lexer/Tag";
import {DeclareVariable} from "./DeclareVariable";

export type FunctionModifiers = typeof Modifiers

export class DeclareParameter extends DeclareVariable {

    identifier: Token<string>;
    span: Span;
    valueType: Token<string> | undefined;
    modifiers: typeof Modifiers;
    default: Expression | Literal<any>
    optional: Boolean

    constructor(identifier: Token<string>, type: Token<string> | undefined, defaultValue: Expression | Literal<any>, optional: Boolean, span: Span) {
        super("variable", identifier, type, defaultValue, span);
        this.type = type
        this.identifier = identifier
        this.valueNode = defaultValue
        this.span = span
        this.optional = optional
    }

    toString() {
        return `${this.identifier.content}${this.optional ? "?" : ""}${this.default ? "=" + this.default : ""}`
    }

}

export class DeclareFunction extends Declare {

    identifier: Token<string>;
    resultType: Token<string> | undefined
    parameters: DeclareParameter[]
    content: Block
    modifiers: FunctionModifiers
    span: Span;

    constructor(modifiers: FunctionModifiers, identifier: Token<string>, parameters: DeclareParameter[], resultType: Token<string> | undefined, content: Block, span: Span) {
        super();
        this.modifiers = modifiers
        this.identifier = identifier
        this.parameters = parameters
        this.resultType = resultType
        this.content = content
        this.span = span
    }

    toString() {
        return `${this.identifier.content}(${this.parameters.map(parameter => parameter.toString()).join(',')})`
    }

}
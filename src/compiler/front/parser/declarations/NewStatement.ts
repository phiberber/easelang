import Parser from "../Parser";
import Tag, {Modifiers} from "../../lexer/Tag";
import {DeclareClass} from "../../../full/nodes/declare/DeclareClass";
import {parseBlock} from "../misc/ParseBlock";
import {NewStatement} from "../../../full/nodes/statement/NewStatement";
import {parseFunctionCall} from "../statements/ParseFunctionCall";
import {FunctionCall} from "../../../full/nodes/call/FunctionCall";

export function parseNewStatement(this: Parser, modifiers: typeof Modifiers): NewStatement {
    this.match(Tag.New)
    const functionCall: FunctionCall = parseFunctionCall.call(this)
    return new NewStatement(functionCall.identifier, functionCall.parameters, functionCall.span)
}
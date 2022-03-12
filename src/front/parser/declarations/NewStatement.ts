import Parser from "../Parser";
import Tag, {Modifiers} from "../../../shared/Tag";
import {NewStatement} from "../../../shared/nodes/statement/NewStatement";
import {parseFunctionCall} from "../statements/ParseFunctionCall";
import {FunctionCall} from "../../../shared/nodes/call/FunctionCall";

export function parseNewStatement(this: Parser, modifiers: typeof Modifiers): NewStatement {
    this.match(Tag.New)
    const functionCall: FunctionCall = parseFunctionCall.call(this)
    return new NewStatement(functionCall.identifier, functionCall.parameters, functionCall.span)
}
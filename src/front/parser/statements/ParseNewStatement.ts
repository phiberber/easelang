import Parser from "@front/parser/Parser";
import Tag, {Modifiers} from "@shared/Tag";
import NewStatement from "@nodes/statement/NewStatement";
import FunctionCall from "@nodes/call/FunctionCall";
import parseFunctionCall from "@front/parser/statements/ParseFunctionCall";

export default function parseNewStatement(this: Parser, modifiers: typeof Modifiers): NewStatement {
    this.match(Tag.New)
    const functionCall: FunctionCall = parseFunctionCall.call(this)
    return new NewStatement(functionCall.identifier, functionCall.parameters, functionCall.span)
}
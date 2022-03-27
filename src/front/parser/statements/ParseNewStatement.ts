import Parser from "@front/parser/Parser";
import {Modifiers} from "@shared/Tag";
import NewExpression from "@nodes/expression/NewExpression";

export default function parseNewStatement(this: Parser, modifiers: typeof Modifiers): NewExpression {
    throw new Error("Not implemented")
}
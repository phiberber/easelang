import Parser from "../Parser";
import {AssignStatement} from "../../../full/nodes/statement/AssignStatement";
import Tag, {AssignmentTags} from "../../lexer/Tag";
import {parseExpression} from "../expressions/ParseExpression";

export function parseAssignStatement(this: Parser): AssignStatement {
    const startMatch = this.match(Tag.Identifier)
    const matchOperator = this.match(AssignmentTags)
    const value = parseExpression.call(this)
    const assignmentSpan = startMatch.span.copy().expandEnd(this.span)
    return new AssignStatement(startMatch, matchOperator, value, assignmentSpan)
}
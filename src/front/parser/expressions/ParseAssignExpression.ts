import AssignExpression from "@nodes/expression/AssignExpression";
import parseExpression from "@front/parser/expressions/ParseExpression";
import parseIdentifier from "@front/parser/expressions/ParseIdentifier";
import Parser from "@front/parser/Parser";
import {AssignmentTags} from "@shared/Tag";

export default function parseAssignExpression(this: Parser): AssignExpression {
    const assigned = parseIdentifier.call(this)
    const matchOperator = this.match(AssignmentTags)
    const value = parseExpression.call(this)
    const assignmentSpan = assigned.span.copy().expandEnd(this.span)
    return new AssignExpression(assigned, matchOperator, value, assignmentSpan)
}
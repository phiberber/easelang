import {AssignExpression} from "@nodes/expression/AssignExpression";
import {AssignmentTags} from "@shared/Tag";
import {parseExpression} from "@front/parser/expressions/ParseExpression";
import {parseIdentifier} from "@front/parser/expressions/ParseIdentifier";
import {Parser} from "@front/parser/Parser";

export function parseAssignExpression(this: Parser): AssignExpression {
    const assigned = parseIdentifier.call(this)
    const matchOperator = this.match(AssignmentTags)
    const value = parseExpression.call(this) ?? this.raise(`Expected an expression after ${assigned.value}`)
    const assignmentSpan = assigned.span.copy().expandEnd(this.span)
    return new AssignExpression(assigned, matchOperator, value, assignmentSpan)
}
import {AssignExpression} from "@nodes/expression/AssignExpression";
import {AssignmentTags} from "@shared/Tag";
import {parseExpression} from "@front/parser/expressions/ParseExpression";
import {Parser} from "@front/parser/Parser";
import {IdentifierExpression} from "@nodes/expression/IdentifierExpression";
import {MemberExpression} from "@nodes/expression/MemberExpression";

export function parseAssignExpression(this: Parser, assigned: IdentifierExpression | MemberExpression): AssignExpression {
    const matchOperator = this.match(AssignmentTags)
    const value = parseExpression.call(this) ?? this.raise(`Expected an expression after ${assigned}`)
    const assignmentSpan = assigned.span.copy().expandEnd(this.span)
    return new AssignExpression(assigned, matchOperator, value, assignmentSpan)
}
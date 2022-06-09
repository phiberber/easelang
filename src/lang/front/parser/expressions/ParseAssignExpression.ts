import {AssignExpression} from "@/lang/shared/nodes/expression/AssignExpression";
import {AssignmentTags} from "@/lang/shared/Tag";
import {parseExpression} from "@/lang/front/parser/expressions/ParseExpression";
import {Parser} from "@/lang/front/parser/Parser";
import {IdentifierLiteral} from "@/lang/shared/nodes/literal/IdentifierLiteral";
import {MemberExpression} from "@/lang/shared/nodes/expression/MemberExpression";

export function parseAssignExpression(this: Parser, assigned: IdentifierLiteral | MemberExpression): AssignExpression {
    const matchOperator = this.match(AssignmentTags)
    const value = parseExpression.call(this) ?? this.raise(`Expected an expression after ${assigned}`)
    const assignmentSpan = assigned.span.expand(this.span)
    return new AssignExpression(assigned, matchOperator, value, assignmentSpan)
}
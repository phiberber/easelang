import parseExpression from "@front/parser/expressions/ParseExpression";
import AssignStatement from "@nodes/statement/AssignStatement";
import Tag, {AssignmentTags} from "@shared/Tag";
import Parser from "@front/parser/Parser";

export default function parseAssignStatement(this: Parser): AssignStatement {
    const startMatch = this.match(Tag.Identifier)
    const matchOperator = this.match(AssignmentTags)
    const value = parseExpression.call(this)
    const assignmentSpan = startMatch.span.copy().expandEnd(this.span)
    return new AssignStatement(startMatch, matchOperator, value, assignmentSpan)
}
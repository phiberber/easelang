import type {Expression} from "@nodes/expression/Expression";
import type {BooleanExpression} from "@nodes/expression/BooleanExpression";
import type {BinaryExpression} from "@nodes/expression/BinaryExpression";
import type {UnaryExpression} from "@nodes/expression/UnaryExpression";

export type Factor = Expression | undefined
export type NotOperand = Factor | BooleanExpression
export type Unary = NotOperand | UnaryExpression
export type Term = Unary | BinaryExpression
export type SimpleExpression = Term | BinaryExpression
export type EqualityOperand = SimpleExpression | BinaryExpression
export type AndOperand = EqualityOperand | BinaryExpression
export type OrOperand = AndOperand | BooleanExpression
export type ParenthesisExpression = Expression | undefined
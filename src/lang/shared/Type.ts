import type {Expression} from "@/lang/shared/nodes/expression/Expression";
import type {BooleanExpression} from "@/lang/shared/nodes/expression/BooleanExpression";
import type {BinaryExpression} from "@/lang/shared/nodes/expression/BinaryExpression";
import type {UnaryExpression} from "@/lang/shared/nodes/expression/UnaryExpression";

export type Factor = Expression | undefined
export type NotOperand = Factor | BooleanExpression
export type Unary = NotOperand | UnaryExpression
export type Term = Unary | BinaryExpression
export type SimpleExpression = Term | BinaryExpression
export type EqualityOperand = SimpleExpression | BinaryExpression
export type AndOperand = EqualityOperand | BinaryExpression
export type OrOperand = AndOperand | BooleanExpression
export type ParenthesisExpression = Expression | undefined
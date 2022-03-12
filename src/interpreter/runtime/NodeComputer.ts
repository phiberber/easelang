import ParserNode from "@nodes/ParserNode";
import Tag from "@shared/Tag";
import {
    interpretClassDeclaration,
    interpretFunctionDeclaration,
    interpretVariableDeclaration
} from "@interpreter/runtime/NodeDeclarer";
import Scope from "@interpreter/memory/Scope";
import DeclareClass from "@nodes/declare/DeclareClass";
import DeclareVariable from "@nodes/declare/DeclareVariable";
import {DeclareFunction} from "@nodes/declare/DeclareFunction";
import ConditionalStatement from "@nodes/statement/ConditionalStatement";
import {
    executeAssign,
    executeFunctionCall,
    executeIf,
    executeNew,
    executeWhile
} from "@interpreter/runtime/StatementExecutor";
import WhileStatement from "@nodes/statement/WhileStatement";
import NewStatement from "@nodes/statement/NewStatement";
import AssignStatement from "@nodes/statement/AssignStatement";
import FunctionCall from "@nodes/call/FunctionCall";
import BooleanExpression from "@nodes/expression/BooleanExpression";
import BinaryExpression from "@nodes/expression/BinaryExpression";
import VariableLiteral from "@nodes/literal/VariableLiteral";
import Literal from "@nodes/literal/Literal";
import RuntimeVariable from "@interpreter/runtime/declared/RuntimeVariable";

export default function computeNode(node: ParserNode | undefined, scope: Scope, depth = 1): any {

    let current = 0
    let result = node

    while (current++ < depth) {

        let depthResult

        if (result instanceof DeclareClass)
            depthResult = interpretClassDeclaration(result, scope)

        if (result instanceof DeclareVariable)
            depthResult = interpretVariableDeclaration(result, scope)

        if (result instanceof DeclareFunction)
            depthResult = interpretFunctionDeclaration(result, scope)

        if (result instanceof ConditionalStatement)
            depthResult = executeIf(result, scope)

        if (result instanceof WhileStatement)
            depthResult = executeWhile(result, scope)

        if (result instanceof NewStatement)
            depthResult = executeNew(result, scope)

        if (result instanceof AssignStatement)
            depthResult = executeAssign(result, scope)

        if (result instanceof FunctionCall)
            depthResult = executeFunctionCall(result, scope)

        if (result instanceof BooleanExpression)
            depthResult = computeBooleanExpression(result, scope)

        if (result instanceof BinaryExpression)
            depthResult = computeBinaryExpression(result, scope)

        if (result instanceof VariableLiteral)
            depthResult = computeLiteral(result, scope)

        if (result instanceof Literal)
            depthResult = computeLiteral(result, scope)

        if(depthResult !== undefined && depthResult.nodeType !== "declare" && depthResult !== result) {
            result = depthResult
        } else break

    }

    return result

}

export function computeLiteral<T>(literal: Literal<T>, scope: Scope): T {

    if(literal instanceof VariableLiteral) {
        const variableMemoryPointer = RuntimeVariable.internalReferenceName(literal.name)
        const { get: retrieveNode, has: hasNodeStored } = scope.reference<RuntimeVariable<T>>(variableMemoryPointer)
        if (!hasNodeStored())
            throw new Error("Variable named " + literal.name + " not found in the scope.")
        const runtimeVariable = retrieveNode()
        return runtimeVariable.compute("", scope)
    }

    return literal.name
}

export function computeBooleanExpression(expression: BooleanExpression, scope: Scope): any {

    let leftValue = this.computeValue(expression.left, scope)
    let rightValue = this.computeValue(expression.right, scope)

    if (expression.operator === Tag.BooleanNot)
        return !rightValue

    if (expression.operator === Tag.BooleanOr)
        return leftValue || rightValue

    if (expression.operator === Tag.BooleanAnd)
        return leftValue && rightValue

}

export function computeBinaryExpression(expression: BinaryExpression, scope: Scope): any {

    let leftValue = computeNode(expression.left, scope)
    let rightValue = computeNode(expression.right, scope)

    if (expression.operator === Tag.Addition)
        return leftValue as any + rightValue as any

    if (expression.operator === Tag.Subtraction)
        return leftValue as any - rightValue as any

    if (expression.operator === Tag.Multiplication)
        return leftValue as any * rightValue as any

    if (expression.operator === Tag.Division)
        return leftValue as any / rightValue as any

    if (expression.operator === Tag.Remainer)
        return leftValue as any % rightValue as any

    if (expression.operator === Tag.Equals)
        return leftValue as any == rightValue as any

    if (expression.operator === Tag.NotEquals)
        return leftValue as any !== rightValue as any

    if (expression.operator === Tag.Less)
        return leftValue as any < rightValue as any

    if (expression.operator === Tag.LessOrEqual)
        return leftValue as any <= rightValue as any

    if (expression.operator === Tag.Greater)
        return leftValue as any > rightValue as any

    if (expression.operator === Tag.Greater)
        return leftValue as any >= rightValue as any

    throw new Error("Could not find a valid expression for " + expression.operator.symbol.description)

}
import {ParserNode} from "../../shared/nodes/ParserNode";
import {Scope} from "../memory/Scope";
import {FunctionCall} from "../../shared/nodes/call/FunctionCall";
import {VariableLiteral} from "../../shared/nodes/literal/VariableLiteral";
import {BooleanExpression} from "../../shared/nodes/expression/BooleanExpression";
import {BinaryExpression} from "../../shared/nodes/expression/BinaryExpression";
import {Literal} from "../../shared/nodes/literal/Literal";
import {NewStatement} from "../../shared/nodes/statement/NewStatement";
import Tag from "../../shared/Tag";
import {DeclareClass} from "../../shared/nodes/declare/DeclareClass";
import {DeclareVariable} from "../../shared/nodes/declare/DeclareVariable";
import {DeclareFunction} from "../../shared/nodes/declare/DeclareFunction";
import {ConditionalStatement} from "../../shared/nodes/statement/ConditionalStatement";
import {WhileStatement} from "../../shared/nodes/statement/WhileStatement";
import {RuntimeVariable} from "./declared/RuntimeVariable";
import {executeAssign, executeFunctionCall, executeIf, executeNew, executeWhile} from "./StatementExecutor";
import {interpretClassDeclaration, interpretFunctionDeclaration, interpretVariableDeclaration} from "./NodeDeclarer";
import {AssignStatement} from "../../shared/nodes/statement/AssignStatement";

export function computeNode(node: ParserNode | undefined, scope: Scope, depth = 1): any {

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
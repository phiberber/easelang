import {AssignExpression} from "@/lang/shared/nodes/expression/AssignExpression";
import {BinaryExpression} from "@/lang/shared/nodes/expression/BinaryExpression";
import {BlockExpression} from "@/lang/shared/nodes/expression/BlockExpression";
import {BooleanExpression} from "@/lang/shared/nodes/expression/BooleanExpression";
import {CallExpression} from "@/lang/shared/nodes/expression/CallExpression";
import {executeStatement} from "@/lang/interpreter/runtime/Executor";
import {Expression} from "@/lang/shared/nodes/expression/Expression";
import {FunctionExpression} from "@/lang/shared/nodes/expression/FunctionExpression";
import {IdentifierLiteral} from "@/lang/shared/nodes/literal/IdentifierLiteral";
import {LiteralExpression} from "@/lang/shared/nodes/literal/LiteralExpression";
import {MemberExpression} from "@/lang/shared/nodes/expression/MemberExpression";
import {Scope} from "@/lang/interpreter/memory/Scope";
import {Tag} from "@/lang/shared/Tag";
import {UnaryExpression} from "@/lang/shared/nodes/expression/UnaryExpression";
import {ArrayExpression} from "@/lang/shared/nodes/expression/ArrayExpression";
import {WhenExpression} from "@/lang/shared/nodes/expression/WhenExpression";
import {ForExpression} from "@/lang/shared/nodes/expression/ForExpression";
import {ConditionalExpression} from "@/lang/shared/nodes/statement/ConditionalExpression";

export function computeExpression<T extends Expression>(expression: T | undefined, scope: Scope): any | undefined {
    if (!expression) return undefined
    if (expression instanceof BooleanExpression) return computeBooleanExpression(expression, scope)
    else if (expression instanceof AssignExpression) return computeAssign(expression, scope);
    else if (expression instanceof MemberExpression) return computeMemberExpression(expression, scope)
    else if (expression instanceof BinaryExpression) return computeBinaryExpression(expression, scope)
    else if (expression instanceof UnaryExpression) return computeUnaryExpression(expression, scope)
    else if (expression instanceof IdentifierLiteral) return computeIdentifierExpression(expression, scope)
    else if (expression instanceof LiteralExpression) return computeLiteralExpression(expression as LiteralExpression<any>)
    else if (expression instanceof FunctionExpression) return computeFunctionDeclaration(expression, scope)
    else if (expression instanceof ConditionalExpression) return computeConditionalExpression(expression, scope)
    else if (expression instanceof CallExpression) return computeCallExpression(expression, scope)
    else if (expression instanceof BlockExpression) return computeBlock(expression, scope)
    else if (expression instanceof ForExpression) return computeForExpression(expression, scope)
    else if (expression instanceof WhenExpression) return computeWhenExpression(expression, scope)
    else if (expression instanceof ArrayExpression) return computeArrayExpression(expression, scope)
    else throw new Error(`Unsupported expression type: ${JSON.stringify(expression)}`)
}

export function computeLiteralExpression<T = any>(literal: LiteralExpression<T>): T {
    return literal.value
}

export function computeMemberExpression(expression: MemberExpression, scope: Scope): any | null {
    const object = computeExpression(expression.object, scope)
    const propertyName = expression.property.value
    let property
    if (typeof object != 'object') property = object[propertyName]
    else if (propertyName in object) property = object[propertyName]
    else property = null
    if (typeof property === "string") property = new String(property)
    if (typeof property === "number") property = new Number(property)
    if (property) property.$context = object
    return property
}

export function computeIdentifierExpression(identifier: IdentifierLiteral, scope: Scope): any {
    const reference = scope.reference(identifier.value)
    if (!reference.has()) throw new Error(`Variable "${identifier.value}" not found in the current scope.`)
    return reference.get()
}

export function computeAssign(statement: AssignExpression, scope: Scope): any {
    let reference
    let object
    if (statement.assigned instanceof MemberExpression) {
        const assigned = statement.assigned as MemberExpression
        const left = computeExpression(assigned.object, scope)
        reference = {
            set(value) {
                left[assigned.property.value] = value
            }
        }
        object = computeExpression(assigned, scope)
    } else {
        reference = scope.reference(statement.assigned.value)
        object = reference.get()
        if (object == null) throw new Error(`The variable "${statement.assigned}" was not present in the context scope`)
    }
    const expression: typeof object = computeExpression(statement.value, scope)
    if (expression == null) throw new Error(`The right side of an expression should not be undefined`)
    if (statement.operator.tag == Tag.Assign) object = expression
    if (statement.operator.tag == Tag.AssignPlus) object += expression
    if (statement.operator.tag == Tag.AssignMinus) object -= expression
    if (statement.operator.tag == Tag.AssignMultiplied) object *= expression
    if (statement.operator.tag == Tag.AssignDivided) object /= expression
    if (statement.operator.tag == Tag.AssignRemained) object %= expression
    reference.set(object)
    return object
}

export function computeCallExpression<T>(expression: CallExpression, scope: Scope): any {
    let callee = computeExpression(expression.callee, scope)
    const args = expression.arguments.map(it => computeExpression(it, scope))
    if (callee.$context) callee = callee.bind(callee.$context)
    return callee(...args)
}

export function computeBooleanExpression(expression: BooleanExpression, scope: Scope): any {
    const left = computeExpression(expression.left, scope)
    const right = computeExpression(expression.right, scope)
    let result
    if (expression.operator === Tag.BooleanNot) result = !right
    else if (expression.operator === Tag.BooleanOr) result = left || right
    else if (expression.operator === Tag.BooleanAnd) result = left && right
    else throw new Error(`Unknown boolean operator ${expression.operator}`)
    return result
}

export function computeArrayExpression(expression: ArrayExpression, scope: Scope): any {
    return expression.elements.map(it => computeExpression(it, scope))
}

export function computeWhenExpression(expression: WhenExpression, scope: Scope): any {
    const whenScope = scope.copy()
    const computedDiscriminant = computeExpression(expression.discriminant, scope)
    const fallbackCase = expression.cases.find(it => !it.test)
    const conditionalCases = expression.cases.filter(it => it.test)
    whenScope.set("it", computedDiscriminant)
    let validCase = conditionalCases.find(it => {
        if (it.test instanceof LiteralExpression) return it.test == computedDiscriminant
        return computeExpression(it.test, whenScope)
    }) ?? fallbackCase
    if (!validCase) throw new Error("It is required to have an else when condition.")
    return computeExpression(validCase.body!, scope)
}

export function computeForExpression(expression: ForExpression, scope: Scope): any {
    const forScope = new Scope("local")
    const forResults = []
    const iterator = computeExpression(expression.right, scope)
    forScope.importParent(scope)
    if (typeof iterator !== "string" && !Array.isArray(iterator)) throw new Error("The value passed to for is not an iterator")
    for (const iterated of iterator) {
        forScope.set(expression.left.value, iterated)
        forResults.push(computeBlock(expression.body, forScope))
    }
    return forResults
}

export function computeUnaryExpression(expression: UnaryExpression, scope: Scope): any {
    const {operator, prefix} = expression
    let argument = expression.argument
    let value = computeExpression(argument, scope)
    const before = value
    if (operator === Tag.BooleanNot) return !value
    if (operator === Tag.Subtraction) return -value
    if (operator === Tag.Addition) return +value
    if (!(argument instanceof IdentifierLiteral)) throw new Error("Identifier expected with unary operator.")
    const identifier = argument as IdentifierLiteral
    const reference = scope.reference(identifier.value)
    if (operator === Tag.Increment) reference.set(value + 1)
    if (operator === Tag.Decrement) reference.set(value - 1)
    return prefix ? value : before
}

export function computeConditionalExpression(statement: ConditionalExpression, scope: Scope) {
    if (statement.test === undefined || computeExpression(statement.test, scope)) {
        return computeBlock(statement.consequent, scope)
    } else if (statement.alternate) {
        return computeConditionalExpression(statement.alternate, scope)
    }
}

export function computeBinaryExpression(expression: BinaryExpression, scope: Scope): any {
    const operator = expression.operator
    const left = computeExpression(expression.left, scope)
    const right = computeExpression(expression.right, scope)
    let result
    if (operator === Tag.Addition) result = (left as any) + (right as any)
    else if (operator === Tag.Subtraction) result = (left as any) - (right as any)
    else if (operator === Tag.Multiplication) result = (left as any) * (right as any)
    else if (operator === Tag.Division) result = (left as any) / (right as any)
    else if (operator === Tag.Remainder) result = (left as any) % (right as any)
    else if (operator === Tag.Equals) result = (left as any) === (right as any)
    else if (operator === Tag.NotEquals) result = (left as any) !== (right as any)
    else if (operator === Tag.Less) result = (left as any) < (right as any)
    else if (operator === Tag.LessOrEqual) result = (left as any) <= (right as any)
    else if (operator === Tag.Greater) result = (left as any) > (right as any)
    else if (operator === Tag.GreaterOrEqual) result = (left as any) >= (right as any)
    else throw new Error("Unknown binary operator " + operator)
    return result
}

export function computeFunctionDeclaration(declaration: FunctionExpression, scope: Scope): Function {
    const anonymous = declaration.identifier === IdentifierLiteral.empty
    const reference = scope.reference(declaration.identifier.value)
    if (!anonymous && reference.has()) throw new Error(`The identifier "${declaration.identifier.value}" has already been declared.`)
    const esFunction = (...args: any[]) => {
        const functionScope = new Scope("local")
        functionScope.set("this", esFunction)
        functionScope.importParent(scope)
        declaration.parameters.forEach((parameter, index) => {
            if (args.length <= index && !parameter.optional) {
                if (!parameter.optional) throw new Error(`The function "${declaration.identifier.value}" has been called but it is missing the parameter "${parameter.identifier.value}".`)
                args[index] = computeExpression(parameter.initializer, scope)
            }
            if (args.length - 1 < index) {
                if(parameter.initializer) {
                    functionScope.set(parameter.identifier.value, computeExpression(parameter.initializer, scope))
                } else functionScope.set(parameter.identifier.value, undefined)
            } else functionScope.set(parameter.identifier.value, args[index])
        })
        return computeBlock(declaration.body, functionScope)
    }
    return anonymous ? esFunction : reference.set(esFunction)
}

export function computeBlock(block: BlockExpression, scope: Scope): any {
    const lastIndex = (block.content.length - 1).toString()
    for (const index in block.content) {
        const node = block.content[index]
        if (node instanceof Expression) {
            const value = computeExpression(node, scope)
            if (index === lastIndex) return value
        } else executeStatement(node, scope)
    }
    return null
}
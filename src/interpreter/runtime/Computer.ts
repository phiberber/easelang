import {AssignExpression} from "@nodes/expression/AssignExpression";
import {BinaryExpression} from "@nodes/expression/BinaryExpression";
import {BlockExpression} from "@nodes/expression/BlockExpression";
import {BooleanExpression} from "@nodes/expression/BooleanExpression";
import {CallExpression} from "@nodes/expression/CallExpression";
import {ESFunction} from "@interpreter/memory/objects/ESFunction";
import {ESObject} from "@interpreter/memory/objects/ESObject";
import {executeStatement} from "@interpreter/runtime/Executor";
import {Expression} from "@nodes/expression/Expression";
import {FunctionExpression} from "@nodes/declare/FunctionExpression";
import {IdentifierExpression} from "@nodes/expression/IdentifierExpression";
import {LiteralExpression} from "@nodes/literal/LiteralExpression";
import {MemberExpression} from "@nodes/expression/MemberExpression";
import {Scope} from "@interpreter/memory/Scope";
import {Tag} from "@shared/Tag";
import {UnaryExpression} from "@nodes/expression/UnaryExpression";

export function computeExpression<T extends Expression>(expression: T | undefined, scope: Scope): ESObject {
    if (!expression) return ESObject.null
    if (expression instanceof BooleanExpression) return computeBooleanExpression(expression, scope)
    else if (expression instanceof AssignExpression) return computeAssign(expression, scope);
    else if (expression instanceof MemberExpression) return computeMemberExpression(expression, scope)
    else if (expression instanceof BinaryExpression) return computeBinaryExpression(expression, scope)
    else if (expression instanceof UnaryExpression) return computeUnaryExpression(expression, scope)
    else if (expression instanceof LiteralExpression) return computeLiteralExpression(expression, scope)
    else if (expression instanceof IdentifierExpression) return computeIdentifierExpression(expression, scope)
    else if (expression instanceof FunctionExpression) return computeFunctionDeclaration(expression, scope)
    else if (expression instanceof CallExpression) return computeCallExpression(expression, scope)
    else if (expression instanceof BlockExpression) return computeBlock(expression, scope)
    else throw new Error(`Unsupported expression type: ${expression.constructor.name}`)
}

export function computeLiteralExpression<T>(literal: LiteralExpression<T>, scope: Scope): ESObject {
    const value = literal.value
    return new ESObject(value)
}

export function computeMemberExpression(expression: MemberExpression, scope: Scope): ESObject {
    const object = computeExpression(expression.left, scope)
    const propertyName = expression.right.value
    let property
    if(propertyName in object.properties) property = object.getProperty(propertyName)!!
    else if(propertyName in object.value) property = new ESObject(object.value[propertyName])
    else property = ESObject.null
    property.context = object
    return property
}

export function computeIdentifierExpression(identifier: IdentifierExpression, scope: Scope): ESObject {
    const reference = scope.reference(identifier.value)
    const object = reference.get()
    if (!object) throw new Error(`Variable "${identifier.value}" not found in the current scope.`)
    return object
}

export function computeAssign(statement: AssignExpression, scope: Scope) {
    const reference = scope.reference(statement.assigned.value)
    const runtimeObject = reference.get()
    if (!runtimeObject) throw new Error(`The variable "${statement.assigned.value}" was not present in the context scope.`)
    const expression = computeExpression(statement.value, scope)
    runtimeObject.value = expression.value
    return runtimeObject
}

export function computeCallExpression<T>(expression: CallExpression, scope: Scope): ESObject {
    const callee = computeExpression(expression.callee, scope)
    let calleeBody = callee.value
    const args = expression.args.map(it => computeExpression(it, scope).value)
    const calleeContext = callee.context
    if(calleeContext) calleeBody = calleeBody.bind(calleeContext.value)
    const returned = calleeBody(...args)
    return returned instanceof ESObject ? returned : new ESObject(returned)
}

export function computeBooleanExpression(expression: BooleanExpression, scope: Scope): ESObject {
    const left = computeExpression(expression.left, scope)
    const right = computeExpression(expression.right, scope)
    let result
    if (expression.operator === Tag.BooleanNot) result = !right.value
    else if (expression.operator === Tag.BooleanOr) result = left.value || right.value
    else if (expression.operator === Tag.BooleanAnd) result = left.value && right.value
    else throw new Error(`Unknown boolean operator ${expression.operator}`)
    return new ESObject(result)
}

export function computeUnaryExpression(expression: UnaryExpression, scope: Scope): ESObject {
    const { operator, prefix } = expression
    const argument = computeExpression(expression.argument, scope)
    const before = argument.value
    if(operator === Tag.Increment) argument.setValue(argument.value + 1)
    else if(operator === Tag.Decrement) argument.setValue(argument.value - 1)
    else if(operator === Tag.BooleanNot) return new ESObject(!argument.value)
    else throw new Error(`Unknown unary operator ${operator}`)
    return prefix ? argument : new ESObject(before)
}

export function computeBinaryExpression(expression: BinaryExpression, scope: Scope): ESObject {
    const operator = expression.operator
    const left = computeExpression(expression.left, scope).value
    const right = computeExpression(expression.right, scope).value
    let result
    if (operator === Tag.Addition) result = (left as any) + (right as any)
    else if (operator === Tag.Subtraction) result = (left as any) - (right as any)
    else if (operator === Tag.Multiplication) result = (left as any) * (right as any)
    else if (operator === Tag.Division) result = (left as any) / (right as any)
    else if (operator === Tag.Remainer) result = (left as any) % (right as any)
    else if (operator === Tag.Equals) result = (left as any) === (right as any)
    else if (operator === Tag.NotEquals) result = (left as any) !== (right as any)
    else if (operator === Tag.Less) result = (left as any) < (right as any)
    else if (operator === Tag.LessOrEqual) result = (left as any) <= (right as any)
    else if (operator === Tag.Greater) result = (left as any) > (right as any)
    else if (operator === Tag.GreaterOrEqual) result = (left as any) >= (right as any)
    else throw new Error("Unknown binary operator " + operator)
    return new ESObject(result)
}

export function computeFunctionDeclaration(declaration: FunctionExpression, scope: Scope): ESFunction {
    const anonymous = declaration.identifier === IdentifierExpression.empty
    const reference = scope.reference(declaration.identifier.value)
    if (!anonymous && reference.has()) throw new Error(`The identifier "${declaration.identifier.value}" has already been declared.`)
    const esFunction = new ESFunction(declaration.identifier.value, (...functionArguments: any[]) => {
        const functionScope = new Scope("local")
        functionScope.set("this", esFunction)
        functionScope.importParent(scope)
        declaration.parameters.forEach((parameter, index) => {
            if (functionArguments.length <= index && !parameter.optional) {
                if (!parameter.optional) throw new Error(`The function "${declaration.identifier.value}" has been called but it is missing the parameter "${parameter.identifier.value}".`)
                functionArguments[index] = computeExpression(parameter.initializer, scope)
            }
            functionScope.set(parameter.identifier.value, new ESObject(functionArguments[index]))
        })
        return computeBlock(declaration.content, functionScope)
    })
    return anonymous ? esFunction : reference.set(esFunction)
}

export function computeBlock(block: BlockExpression, scope: Scope): ESObject {
    const lastIndex = (block.content.length - 1).toString()
    for (const index in block.content) {
        const node = block.content[index]
        if (node instanceof Expression) {
            const value = computeExpression(node, scope)
            if (index === lastIndex) return value
        } else executeStatement(node, scope)
    }
    return ESObject.null
}
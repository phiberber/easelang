import ConditionalStatement from "@nodes/statement/ConditionalStatement";
import AssignStatement from "@nodes/statement/AssignStatement";
import WhileStatement from "@nodes/statement/WhileStatement";
import NewStatement from "@nodes/statement/NewStatement";
import FunctionCall from "@nodes/call/FunctionCall";
import RuntimeFunction from "@interpreter/runtime/declared/RuntimeFunction";
import RuntimeVariable from "@interpreter/runtime/declared/RuntimeVariable";
import RuntimeClass from "@interpreter/runtime/declared/RuntimeClass";
import computeNode from "@interpreter/runtime/NodeComputer";
import Scope from "@interpreter/memory/Scope";
import Block from "@nodes/Block";

export function executeIf(statement: ConditionalStatement, scope: Scope): Boolean {
    if (statement.condition === undefined || computeNode(statement.condition, scope)) {
        executeBlock(statement.block, scope)
        return true
    } else if (statement.fallbacks) {
        const fallback = statement.fallbacks.find(fallback => executeIf(fallback, scope))
        return fallback !== undefined
    }
    return false
}

export function executeWhile(statement: WhileStatement, scope: Scope): Boolean {
    let executed = false
    while (computeNode(statement.condition, scope)) {
        executed = true
        executeBlock(statement.block, scope)
    }
    if (!executed && statement.fallback)
        executeBlock(statement.fallback, scope)
    return executed
}

export function executeFunctionCall(call: FunctionCall, scope: Scope): Boolean {
    const referenceName = RuntimeFunction.internalReferenceName(call.identifier.content)
    const {
        get: retrieveFunction,
        has: hasFunctionStored
    } = scope.reference<RuntimeFunction>(referenceName)
    if (!hasFunctionStored())
        throw new Error(`The function with the name of "${call.identifier.content}" was not present in the context scope.`)
    const runtimeFunction = retrieveFunction()
    const computedParameters = call.parameters.map(parameter => computeNode(parameter, scope, Infinity))
    return runtimeFunction.execute(computedParameters, scope)
}

export function executeAssign(statement: AssignStatement, scope: Scope): any {
    const referenceName = RuntimeVariable.internalReferenceName(statement.assigned.content)
    const {get: getVariable} = scope.reference<RuntimeVariable<any>>(referenceName)
    const runtimeVariable = getVariable()
    const runtimeValue = computeNode(statement.value, scope, Infinity)
    runtimeVariable.update(runtimeValue, scope)
    return runtimeVariable
}

export function executeNew(statement: NewStatement, scope: Scope): any {

    const referenceName = RuntimeClass.internalReferenceName(statement.identifier.content)
    const {
        get: retrieveClass,
        has: hasClassStored
    } = scope.reference<RuntimeClass>(referenceName)

    if (!hasClassStored())
        throw new Error(`The class with the name of "${statement.identifier.content} was not present in the context scope."`)

    const runtimeClass = retrieveClass()
    const computedParameters = statement.parameters.map(parameter => this.computeMost(parameter, scope))

    return runtimeClass.init(computedParameters, scope)

}

export function executeBlock(statement: Block, scope: Scope): any {
    const blockContent = statement.content
    const lastIndex = blockContent.length - 1
    let result
    blockContent.forEach((node, index) => {
        const processedResult = computeNode(node, scope)
        if (index === lastIndex) {
            result = processedResult
        }
    })
    return result
}
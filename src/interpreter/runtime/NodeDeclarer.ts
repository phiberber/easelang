import {RuntimeClass} from "./declared/RuntimeClass";
import {RuntimeVariable} from "./declared/RuntimeVariable";
import {RuntimeFunction} from "./declared/RuntimeFunction";
import {DeclareClass} from "../../shared/nodes/declare/DeclareClass";
import {Scope} from "../memory/Scope";
import {computeNode} from "./NodeComputer";
import {DeclareVariable} from "../../shared/nodes/declare/DeclareVariable";
import {DeclareFunction} from "../../shared/nodes/declare/DeclareFunction";

export function interpretClassDeclaration(declaration: DeclareClass, scope: Scope): RuntimeClass {
    const referenceName = RuntimeClass.internalReferenceName(declaration.identifier.content)
    const {set: storeClass} = scope.reference(referenceName)
    const runtimeClass = new RuntimeClass(declaration)
    storeClass(runtimeClass)
    return runtimeClass
}

export function interpretVariableDeclaration(declaration: DeclareVariable, scope: Scope): RuntimeVariable<any> {
    const referenceName = RuntimeVariable.internalReferenceName(declaration.identifier.content)
    const {set: storeVariable} = scope.reference(referenceName)
    const runtimeVariable = new RuntimeVariable(declaration)
    storeVariable(runtimeVariable)
    const runtimeValue = computeNode(declaration.valueNode, scope, Infinity)
    runtimeVariable.update(runtimeValue, scope)
    return runtimeVariable
}

export function interpretFunctionDeclaration(declaration: DeclareFunction, scope: Scope): RuntimeFunction {
    const referenceName = RuntimeFunction.internalReferenceName(declaration.identifier.content)
    const {set: storeFunction} = scope.reference(referenceName)
    const runtimeFunction = new RuntimeFunction(declaration)
    storeFunction(runtimeFunction)
    return runtimeFunction
}
import {ClassStatement} from "@nodes/declare/ClassStatement";
import {computeBlock, computeExpression} from "@interpreter/runtime/Computer";
import {ConditionalStatement} from "@nodes/statement/ConditionalStatement";
import {ImportStatement} from "@nodes/statement/ImportStatement";
import {Module} from "@interpreter/modules/Module";
import {Scope} from "@interpreter/memory/Scope";
import {Statement} from "@nodes/statement/Statement";
import {VariableStatement} from "@nodes/declare/VariableStatement";
import {WhileStatement} from "@nodes/statement/WhileStatement";

export function executeStatement<T extends Statement>(statement: T, scope: Scope): void {
    if (statement instanceof ConditionalStatement) return executeConditional(statement, scope);
    if (statement instanceof WhileStatement) return executeWhile(statement, scope);
    if (statement instanceof ImportStatement) return executeImport(statement, scope)
    if (statement instanceof VariableStatement) return executeVariableDeclaration(statement, scope);
    if (statement instanceof ImportStatement) return executeImport(statement, scope);
}

export function executeImport(statement: ImportStatement, scope: Scope) {
    const module = Module.list.get(statement.module.content)
    if (!module) throw new Error(`Module ${statement.module.content} not found.`)
    for (const exportedName in module.exported) {
        const reference = scope.reference(exportedName)
        reference.set(module.exported[exportedName])
    }
}

export function executeClassDeclaration(declaration: ClassStatement, scope: Scope) {
}

export function executeVariableDeclaration(declaration: VariableStatement, scope: Scope) {
    const reference = scope.reference(declaration.identifier.value)
    if(reference.has()) throw new Error(`The identifier "${declaration.identifier.value}" has already declared.`)
    const value = computeExpression(declaration.initializer, scope)
    reference.set(value)
}

export function executeConditional(statement: ConditionalStatement, scope: Scope) {
    if (statement.test == null || computeExpression(statement.test, scope).value) {
        computeBlock(statement.block, scope)
    } else if (statement.fallbacks) {
        statement.fallbacks.find(fallback => executeConditional(fallback, scope))
    }
}

export function executeWhile(statement: WhileStatement, scope: Scope) {
    let executed = false
    while (computeExpression(statement.condition, scope).value) {
        executed = true
        computeBlock(statement.block, scope)
    }
    if (!executed && statement.fallback) computeBlock(statement.fallback, scope)
}
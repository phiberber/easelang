import {AbstractParseTree} from "@/lang/shared/nodes/AbstractParseTree";
import {Scope} from "@/lang/interpreter/memory/Scope";
import {Statement} from "@/lang/shared/nodes/statement/Statement";
import {computeExpression} from "@/lang/interpreter/runtime/Computer";
import {executeStatement} from "@/lang/interpreter/runtime/Executor";

export class Interpreter {

    public readonly syntaxTree: AbstractParseTree | undefined
    public readonly result: any[] = []

    public constructor(content: AbstractParseTree | undefined) {
        this.syntaxTree = content
    }

    public perform(scope: Scope = undefined): { time: number, result: any[] } {
        scope = scope ?? new Scope("intermediate")
        const startTime = new Date().getTime()
        if (!this.syntaxTree) return {time: 0, result: []}
        for (const node of this.syntaxTree.body) {
            if (node instanceof Statement) {
                try {
                    executeStatement(node, scope)
                } catch (e: Error) {
                    e.message += ", line: " + node.span.line
                    console.error(e)
                }
                this.result[node.span.line - 1] = `[${node.type}]`
            } else this.result[node.span.line - 1] = computeExpression(node, scope)
        }
        return {
            time: new Date().getTime() - startTime,
            result: this.result
        }
    }

}
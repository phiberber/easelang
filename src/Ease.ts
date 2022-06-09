import {Lexer} from "@/lang/front/lexer/Lexer";
import {Parser} from "@/lang/front/parser/Parser";
import {Interpreter} from "@/lang/interpreter/Interpreter";
import {Scope} from "@/lang/interpreter/memory/Scope";

interface EvaluationConfig {
    logs?: boolean
    debug?: boolean
}

export function evaluate(code: TemplateStringsArray | string, scope: Scope = undefined, evaluationConfig: EvaluationConfig = {}): any[] | any {

    const logs = evaluationConfig?.logs ?? false
    const debug = evaluationConfig?.debug ?? false

    const lexer = new Lexer(typeof code === "object" ? code.join("\n") : code)
    const lexerExecution = lexer.perform()
    logs && debug && console.log(lexerExecution.result)

    logs && console.log(`Lexing took ${lexerExecution.time}ms to finish and resulted in ${lexerExecution.result.length} tokens.`)

    const parser = new Parser(lexerExecution.result)
    const parserExecution = parser.perform()

    logs && console.log(`Parsing took ${lexerExecution.time}ms to finish.`)
    logs && debug && console.log(parserExecution.result.body)

    logs && console.log('Initializing Interpreter')

    const interpreter = new Interpreter(parserExecution.result)
    const execution = interpreter.perform(scope)

    logs && console.log(`Interpreting took ${execution.time}ms to finish.`)

    let results: any[] = []

    for (const index in execution.result) {
        const value = execution.result[index]
        results.push(value)
    }

    const totalExecutionTime = lexerExecution.time + parserExecution.time + execution.time

    logs && console.log(`\nFinished execution, took ${totalExecutionTime}ms.`)

    return results.length === 1 ? results[0] : results
}

if (typeof window !== "undefined") {
    // @ts-ignore
    window.Ease = { evaluate }
    const easeScripts = [
        ...document.querySelectorAll('script[type="text/ease"]'),
        ...document.querySelectorAll('script[type="application/ease"]')
    ]
    for (const script of easeScripts) {
        if(script.src) {
            fetch(script.src).then(it => it.text().then(evaluate))
        } else evaluate(script.innerHTML)
    }
}
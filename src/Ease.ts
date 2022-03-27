import Lexer from "@front/lexer/Lexer";
import Parser from "@front/parser/Parser";
import Interpreter from "@interpreter/Interpreter";
import ESObject from "@interpreter/memory/objects/ESObject";

const logs = true
const debug = false
const printResult = true

export function evaluate(code: TemplateStringsArray) {

    const lexer = new Lexer(code.join("\n"))
    const lexerExecution = lexer.perform()
    logs && debug && console.log(lexerExecution.result)

    logs && console.log(`Lexing took ${lexerExecution.time}ms to finish and resulted in ${lexerExecution.result.length} tokens.`)

    const parser = new Parser(lexerExecution.result)
    const parserExecution = parser.perform()

    logs && console.log(`Parsing took ${lexerExecution.time}ms to finish.`)
    logs && debug && console.log(parserExecution.result.body)

    logs && console.log('Initializing Interpreter')

    const interpreter = new Interpreter(parserExecution.result)
    const execution = interpreter.perform()

    logs && console.log(`Interpreting took ${execution.time}ms to finish.`)

    let results: any[] = []

    for(const index in execution.result) {
        const value = execution.result[index]
        if(value instanceof ESObject) results.push(value.value)
    }

    return results.length === 1 ? results[0] : results

}
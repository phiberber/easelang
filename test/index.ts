import * as fs from "fs";
import Lexer from "@front/lexer/Lexer";
import Parser from "@front/parser/Parser";
import Interpreter from "@interpreter/Interpreter";

const logs = true
const debug = false

const file = fs.readFileSync("./test/samples/print.se", { encoding: 'utf-8' })

logs && console.log('Initializing Lexer')

const lexer = new Lexer(file)
const lexerExecution = lexer.perform()
logs && debug && console.log(lexerExecution.result)

logs && console.log(`Lexing took ${lexerExecution.time}ms to finish and resulted in ${lexerExecution.result.length} tokens.`)

logs && console.log('Initializing Parser')

const parser = new Parser(lexerExecution.result)
const parserExecution = parser.perform()

logs && console.log(`Parsing took ${lexerExecution.time}ms to finish.`)
logs && debug && console.log(parserExecution.result.body)

logs && console.log('Initializing Interpreter')

const interpreter = new Interpreter(parserExecution.result)
const execution = interpreter.perform()

logs && console.log(`Interpreting took ${execution.time}ms to finish.`)

if(logs && debug) {
    for(const index in execution.result)
        console.log(`stat ${index}. ${execution.result[index]}`)
}

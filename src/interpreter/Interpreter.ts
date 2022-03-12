import AbstractParseTree from "@nodes/AbstractParseTree";
import Lexer from "@front/lexer/Lexer";
import Parser from "@front/parser/Parser";
import Scope from "@interpreter/memory/Scope";
import computeNode from "@interpreter/runtime/NodeComputer";

class Interpreter {

    public syntaxTree: AbstractParseTree | undefined
    public result: any[] = []

    public constructor(content: AbstractParseTree | undefined) {
        this.syntaxTree = content
    }

    public static fromCode(code: string) {
        let interpreter = new Interpreter(undefined)
        let lexer = new Lexer(code)
        let {result: lexerResult} = lexer.perform()
        let parser = new Parser(lexerResult)
        let {result: parserResult} = parser.perform()
        interpreter.syntaxTree = parserResult
        return interpreter
    }

    public perform(): { time: number, result: any[] } {

        const startTime = new Date().getTime()
        const globalScope = new Scope("global")

        if (!this.syntaxTree) return {time: 0, result: []}

        for (const node of this.syntaxTree.body)
            computeNode(node, globalScope)

        return {
            time: new Date().getTime() - startTime,
            result: this.result
        }

    }

}

export default Interpreter
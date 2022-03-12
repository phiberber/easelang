import Token from "../../shared/Token";
import Tag, {Tags} from "../../shared/Tag";
import isNumber from "../../shared/misc/IsNumber";
import {Span} from "../../shared/Span";
import {isUpperCase} from "../../shared/misc/isUpperCase";
import {isLowerCase} from "../../shared/misc/isLowerCase";
import ProcessResult from "../ProcessResult";
import LexerContext, {LexerCode} from "./LexerContext";

class Lexer implements LexerContext {

    public code: LexerCode
    public span: Span

    public constructor(content: string) {
        this.span = new Span(0, 1, content.length - 1, 0)
        this.code = {
            rawCode: content,
            lowerCaseCode: content.toLowerCase()
        }
    }

    public perform(): ProcessResult<Token<any>[]> {
        if (this.code.rawCode.length <= 0) {
            return { time: 0, result: [] }
        }

        const startTime = new Date().getTime()
        const {rawCode} = this.code
        const tokens: Token<any>[] = []
        const maximumIndex: number = rawCode.length - 1
        let lineIndentation = 0

        while (this.span.index <= maximumIndex) {

            const token = this.findToken()

            if (token === undefined || token === null) {
                throw new Error(`Invalid token at point ${this.span.index} - line ${this.span.line}`)
            }

            let tokenLength

            if (token.tag === Tag.String) {
                tokenLength = token.content.length + 2
            } else if (token.tag === Tag.Boolean) {
                tokenLength = token.content ? 4 : 5
            } else if (token.tag === Tag.Integer || token.tag === Tag.Float) {
                tokenLength = token.content.toString().length
            } else {
                tokenLength = token.content.toString().length
            }

            token.span.end = this.span.index += tokenLength

            /** Apply indentation to span */
            if (token.tag === Tag.LineBreak) {
                lineIndentation = 0
                this.span.line++
                this.span.indentation = 0
                continue
            }

            /** Add x to the indentation **/
            if(token.tag === Tag.Space || token.tag === Tag.Tab) {
                if(this.span.indentation === 0) {
                    lineIndentation += token.tag === Tag.Space ? 1 : 4
                }
                continue
            }

            if (this.span.indentation === 0) {
                this.span.indentation = lineIndentation
                token.span.indentation = lineIndentation
            }

            tokens.push(token)
        }

        return {
            time: new Date().getTime() - startTime,
            result: tokens
        }
    }

    public createToken<T>(content: T, tag: Tag): Token<T> {
        return new Token(content, this.code.rawCode, this.span.copy(), tag)
    }

    public charCode(): number {
        return this.code.lowerCaseCode[this.span.index].charCodeAt(0)
    }

    public accept(content: string): boolean {
        if (content.length === 1) return this.code.lowerCaseCode[this.span.index] === content
        return this.code.lowerCaseCode.indexOf(content, this.span.index) - this.span.index === 0
    }

    public findToken(): Token<any> {
        let token: Token<any>

        Tags.some((tag) => {

            if (typeof tag.content === 'string') {
                if (this.accept(tag.content)) {
                    token = this.createToken(tag.content, tag)
                    return true
                }
                return false
            }

            if (tag === Tag.Identifier) {
                const result = Lexer.matchIdentifier(this)
                if(result) token = result
                return !!result
            }

            if (tag === Tag.String) {
                const result = Lexer.matchString(this)
                if(result) token = result
                return !!result
            }

            if (tag === Tag.Integer || tag === Tag.Float) {
                const result = Lexer.matchNumber(this)
                if(result) token = result
                return !!result
            }

            if (Array.isArray(tag.content)) {
                const match: string | undefined = tag.content.find((x) => this.accept(x))
                if (match !== undefined) {
                    token = this.createToken(match, tag)
                    return true
                }
                return false
            }

            return false

        })

        return token
    }

    static matchNumber(lexer: Lexer): Token<number> | undefined {
        if (!isNumber(lexer.charCode())) return undefined

        const {lowerCaseCode} = lexer.code
        let index = lexer.span.index
        let number = ""

        do {
            const char = lowerCaseCode[index++]
            if (!char) break
            if (char !== '.' && !isNumber(char.charCodeAt(0))) break
            number += char
        } while (index < lexer.span.end)

        if (number.includes('.')) {
            return lexer.createToken(Number.parseFloat(number), Tag.Float)
        } else {
            return lexer.createToken(Number.parseInt(number), Tag.Integer)
        }
    }

    static matchIdentifier(lexer: Lexer): Token<string> | undefined {
        const validIdentifierName = (name: string) => {
            if (!name) return false
            const firstChar = name.charCodeAt(0)
            if (isNumber(firstChar)) return false
            const chars = name.split("")
            return chars.every((char) => {
                if (char === '$') return true
                if (char === '_') return true
                const charCode = char.codePointAt(0)
                return isNumber(charCode) || isUpperCase(charCode) || isLowerCase(charCode) || char === '.'
            })
        }

        const {rawCode} = lexer.code
        let text = ""
        let index = lexer.span.index
        const char = rawCode[index]
        const charCode = char.charCodeAt(0)

        if (!isUpperCase(charCode) && !isLowerCase(charCode) && char !== '$' && char !== '_')
            return undefined

        while (index <= lexer.span.end) {
            const char = rawCode.charAt(index)
            if (validIdentifierName(text + char)) {
                text += char
                index++
            } else break
        }

        return lexer.createToken(text, Tag.Identifier)
    }

    static matchString(lexer: Lexer): Token<string> | undefined {
        const {lowerCaseCode} = lexer.code
        let index = lexer.span.index
        let quote = lexer.code.lowerCaseCode[index]
        let maximumIndex = lexer.code.lowerCaseCode.length - 1

        if (quote !== '"' && quote !== "'") return undefined

        while (index <= maximumIndex) {
            const quoteIndex = lowerCaseCode.indexOf(quote, index + 1)
            if (lowerCaseCode[quoteIndex - (index = quoteIndex)] !== '\\') break
        }

        if (index === lexer.span.index)
            throw new Error("Expected a quote end, but found EOF.")

        return lexer.createToken(lexer.code.rawCode.slice(lexer.span.index + 1, index), Tag.String)
    }

}

export default Lexer
package com.lang.grammar.token

import com.util.mapToArray

object Tokens {

    internal val list = mutableListOf<Token>()

    internal fun token(raw_content: Any, content: TokenContent = TokenContent(raw_content)) =
        Token(list.size, content)

    internal fun holder(vararg tokens: Token) =
        Token.Holder(list.size, tokens)

    internal fun nonImplementedToken() =
        token('�')

    internal fun tokenHolder(vararg content: Any) =
        holder(*content.mapToArray(::token))

    internal fun tokenHolder(content: TokenSupplierLambda) =
        holder(token(content))


    val space = tokenHolder(' ')
    val lineBreak = tokenHolder('\n', "\n\r")

    val comment = tokenHolder('#')

    val plus = tokenHolder('+')
    val minus = tokenHolder('-')
    val multiply = tokenHolder('*')
    val divide = tokenHolder('/')

    val dot = tokenHolder('.')
    val assign = tokenHolder('=')

    val singleQuote = tokenHolder('\'')
    val doubleQuote = tokenHolder('\"')

    val openParenthesis = tokenHolder('(')
    val closeParenthesis = tokenHolder(')')

    val openBracket = tokenHolder('{')
    val closeBracket = tokenHolder('}')

    val interrogation = tokenHolder('?')
    val comma = tokenHolder(',')
    val colon = tokenHolder(':')
    val semiColon = tokenHolder(';')

    val equals = tokenHolder("==")
    val notEquals = tokenHolder("!=")

    val lower = tokenHolder('<')
    val higher = tokenHolder('>')

    val lowerOrEqual = tokenHolder("<=")
    val higherOrEqual = tokenHolder(">=")

    val booleanNot = tokenHolder("!")
    val booleanAnd = tokenHolder("&&")
    val booleanOr = tokenHolder("||")

    val byteXor = tokenHolder('^')
    val byteNot = tokenHolder('~')
    val byteAnd = tokenHolder('&')
    val byteOr = tokenHolder('|')

    val byteShl = tokenHolder("<<")
    val byteShr = tokenHolder(">>")

    val _class = tokenHolder("class")
    val _final = tokenHolder("final")
    val _abstract = tokenHolder("abstract")

    val _var = tokenHolder("var")
    val _val = tokenHolder("val")
    val _let = tokenHolder("let")
    val _const = tokenHolder("const")

    val _fun = tokenHolder("fun")
    val _true = tokenHolder("true")
    val _false = tokenHolder("false")
    val _import = tokenHolder("import")
    val _while = tokenHolder("while")

    val _enum = tokenHolder("enum")
    val _if = tokenHolder("if")
    val _else = tokenHolder("else")
    val _pub = tokenHolder("pub")
    val _priv = tokenHolder("priv")
    val _glob = tokenHolder("glob")

    val char = nonImplementedToken()
    val string = tokenHolder { eq(' ') }

    val integer = nonImplementedToken()
    val float = nonImplementedToken()
    val double = nonImplementedToken()
    val short = nonImplementedToken()
    val byte = nonImplementedToken()
    val hex = nonImplementedToken()

    val identifier = nonImplementedToken()

    val unknown = nonImplementedToken()

}
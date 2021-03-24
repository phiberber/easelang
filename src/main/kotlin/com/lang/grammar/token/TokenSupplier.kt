package com.lang.grammar.token

typealias TokenSupplierLambda = TokenSupplier.() -> Boolean

class TokenSupplier(val charArray: CharArray, var index: Int = 0) {

    infix fun TokenSupplier.end(token: Token) = true
    infix fun TokenSupplier.all(consumer: (Char) -> Boolean) = true
    infix fun TokenSupplier.eq(char: Char) = true

}
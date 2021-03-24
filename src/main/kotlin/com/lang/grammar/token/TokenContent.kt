package com.lang.grammar.token

import kotlin.jvm.functions.FunctionN

class TokenContent {

    var char: Char? = null
    var text: CharArray? = null
    var supplier: TokenSupplierLambda? = null

    constructor()

    constructor(value: Any): this() {
        if(value is CharArray) this.text = value
        else if(value is Char) this.char = value
        else this.supplier = value as TokenSupplierLambda
    }

    constructor(supplier: TokenSupplier.() -> Boolean): this() {
        this.supplier = supplier
    }

    fun process(): String = char?.toString() ?: text?.joinToString("") ?: ""

    fun isBlank() = char == null && text == null && supplier == null
    fun isNotBlank() = char != null || text != null || supplier != null
    fun size() = text?.size ?: 1

}
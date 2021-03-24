package com.lang

import com.lang.grammar.token.Tokenizer

fun main() {

    val result = Tokenizer.tokenize("""
        (
    """.trimIndent())

    println(result.joinToString { it.content.process() })

}
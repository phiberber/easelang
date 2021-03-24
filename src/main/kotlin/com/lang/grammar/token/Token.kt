package com.lang.grammar.token

class Token(val id: Int, val content: TokenContent) {

    data class Holder(val id: Int, val tokens: Array<out Token>)

    init {
        if(content.isBlank())
            Tokens.list.add(this)
    }

    fun matches(code: CharArray, index: Int): Boolean {

        if(content.char != null) {
            println("Parsing $this (${content.char} == ${code[index]})")
            return content.char == code[index]
        }

        if(content.text != null) {

            return with(content.text!!) {

                if(code.size - index < size) return false

                var currIndex = size

                while(currIndex-- != 0) {
                    if(code[index + currIndex] != this[currIndex]) {
                        return@with false
                    }
                }

                true

            }

        }

        return false

    }

}
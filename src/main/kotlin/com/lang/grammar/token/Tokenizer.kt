package com.lang.grammar.token

import java.util.*

object Tokenizer {

    fun tokenize(content: String): LinkedList<TokenMatch> {

        val charArray = content.toCharArray()
        val codeLength = charArray.size
        var currentIndex = 0
        val result = LinkedList<TokenMatch>()

        while(currentIndex != codeLength) {

            val token = Tokens.list.firstOrNull { it.matches(charArray, currentIndex) } ?: Tokens.unknown
            val tokenMatch = TokenMatch(token, token.content)

            result.add(tokenMatch)
            currentIndex += tokenMatch.content.size()

        }

        return result

    }

}
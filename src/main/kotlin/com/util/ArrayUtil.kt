package com.util

inline fun <T: Any, reified E: Any> Array<T>.mapToArray(consumer: (T) -> E) =
    arrayOfNulls<E>(size).fillIndexed { i -> consumer(this[i]) } as Array<E>

inline fun <reified T> Array<T>.index(consumer: (Int) -> Unit) =
    repeat(size, consumer)

inline fun <reified T> Array<T>.fill(lambda: () -> T): Array<T> =
    apply { index { this[it] = lambda() } }

inline fun <reified T> Array<T>.fillIndexed(lambda: (Int) -> T): Array<T> =
    apply { index { this[it] = lambda(it) } }
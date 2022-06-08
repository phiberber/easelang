export function letFunction<T, E>(this: T, callback: (arg: T) => E): E {
    return callback(this)
}

export function alsoFunction<T>(this: T, callback: (arg: T) => any): T {
    callback(this)
    return this
}

export function applyFunction<T, E>(this: T, callback: (this: T) => E): E {
    return callback.call(this)
}

export function runFunction<T>(this: T, callback: (this: T) => any): T {
    callback.call(this)
    return this
}
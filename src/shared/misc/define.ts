export function defineNonEnumerable<E>(object: object, key: string, value: E) {
    Object.defineProperty(object, key, {
        value,
        enumerable: false,
        writable: true,
        configurable: true
    });
}
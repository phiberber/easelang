export class ESObject<T = any> {
    [x: string]: any;

    value: T | this | undefined
    properties: { [key: string]: ESObject } = {}

    static null = new ESObject(null)

    constructor(value: T) {
        this.value = value
    }

    getProperty(name: string): ESObject | undefined {
        return this.properties[name]
    }

    setProperty(name: string, value: ESObject) {
        this.properties[name] = value
    }

    setValue(value: T): ESObject {
        this.value = value
        return this
    }

    toString(): string {
        if (this.value == null) return '[Null]'
        if (this.value === this) return '[Circular]'
        if (typeof this.value === "object") return '[ESObject]'
        return `${this.value}`
    }

}
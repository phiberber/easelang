export type ScopeType = "global" | "intermediate" | "local"

export interface ScopeReference<T> {
    get(): T | undefined
    set(value: T)
    has(): Boolean
}

export class Scope {

    public type: ScopeType = "local"

    public parents: Scope[] = []
    public global: Scope

    public content = new Map<String, any>()

    public constructor(type: ScopeType) {
        this.type = type
    }

    public implementParents(...parent: Scope[]): Scope {
        if (parent.length <= 0) return this
        parent.forEach((parent) => {
            this.parents.push(parent)
            if (parent.type === 'global')
                this.global = parent
        })
        return this
    }

    public copy(): Scope {
        const scope = new Scope(this.type)
        scope.parents = this.parents.slice(0)
        scope.global = this.global
        return scope
    }

    public clear(): Scope {
        this.content.clear()
        return this
    }

    public has(name: String): Boolean {
        if(!name) return false
        if(!this.content) return false
        return this.content.has(name)
    }

    public get<T>(name: String): T | undefined {
        if(!name) return undefined
        return this.content.get(name)
    }

    public set<T>(name: String, value: T) {
        if(!name) return undefined
        return this.content.set(name, value)
    }

    public includes(name: String): Boolean {
        if(!name) return false
        return this.reference<any>(name).has()
    }

    public reference<T>(name: String): ScopeReference<T> {
        const accessScope = this.has(name) ? this : (this.parents.find(parent => parent.includes(name)) || this)
        const defineScope = this.type === "intermediate" ? this : accessScope
        return {
            has() { return accessScope.has(name) },
            get(): T { return accessScope.get(name) },
            set(value) {
                if(!accessScope.has(name))
                    defineScope.set(name, value)
                else accessScope.set(name, value)
            }
        }
    }


}

export const ScopeInternal = "$$" // Defines a value that can be accessed from anywhere in the program.
import {Module} from "@interpreter/modules/Module";

export type ScopeType = "global" | "intermediate" | "local"

export interface ScopeReference {
    has(): boolean
    delete(): boolean
    get<T>(): T | undefined
    set<T>(value: T): T
}

export class Scope {

    public type: ScopeType
    public parents: Scope[]
    public content = new Map<string, any>()

    public constructor(type: ScopeType) {
        this.type = type
        this.parents = type !== "global" ? [globalScope] : []
    }

    public importModule(module: Module): this {
        Object.entries(module.exported).forEach(([key, value]) => {
            this.set(key, value)
        })
        return this
    }

    public importParent(...parent: Scope[]): this {
        if (parent.length <= 0) return this
        parent.forEach((parent) => {
            this.parents.push(parent)
        })
        return this
    }

    public copy(): Scope {
        const scope = new Scope(this.type)
        scope.parents = this.parents.slice(0)
        return scope
    }

    public clear(): Scope {
        this.content.clear()
        return this
    }

    public has(name: string): boolean {
        if(!name) return false
        if(!this.content) return false
        return this.content.has(name)
    }

    public get<T>(name: string): T | undefined {
        if(!name) return undefined
        return this.content.get(name)
    }

    public delete(name: string): boolean {
        if(!name) return false
        return this.content.delete(name)
    }

    public set<T>(name: string, value: T | undefined) {
        if(!name) return undefined
        return this.content.set(name, value)
    }

    public reference(name: string): ScopeReference {
        const accessScope = this.has(name) ? this : (this.parents.find(parent => parent.has(name)) || this)
        const defineScope = this.type === "intermediate" ? this : accessScope
        return {
            has(): boolean { return accessScope.has(name) },
            delete(): boolean { return accessScope.delete(name) },
            get<T>(): T | undefined { return accessScope.get(name) },
            set<T>(value: T): T {
                if(!accessScope.has(name))
                    defineScope.set(name, value)
                else accessScope.set(name, value)
                return value
            }
        }
    }
}

export const globalScope = new Scope("global").importModule(Module.global);

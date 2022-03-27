import {ESObject} from "@interpreter/memory/objects/ESObject";
import {Module} from "@interpreter/modules/Module";

export type ScopeType = "global" | "intermediate" | "local"

export interface ScopeReference {
    get(): ESObject | undefined
    set<T extends ESObject>(value: T): T
    has(): Boolean
}

export class Scope {

    public type: ScopeType
    public parents: Scope[]
    public content = new Map<string, ESObject>()

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

    public has(name: string): Boolean {
        if(!name) return false
        if(!this.content) return false
        return this.content.has(name)
    }

    public get(name: string): ESObject | undefined {
        if(!name) return undefined
        return this.content.get(name)
    }

    public set(name: string, value: ESObject) {
        if(!name) return undefined
        return this.content.set(name, value)
    }

    public includes(name: string): Boolean {
        if(!name) return false
        return this.reference(name).has()
    }

    public reference(name: string): ScopeReference {
        const accessScope = this.has(name) ? this : (this.parents.find(parent => parent.includes(name)) || this)
        const defineScope = this.type === "intermediate" ? this : accessScope
        return {
            has() { return accessScope.has(name) },
            get(): ESObject | undefined { return accessScope.get(name) },
            set<T extends ESObject>(value: T): T {
                if(!accessScope.has(name))
                    defineScope.set(name, value)
                else accessScope.set(name, value)
                return value
            }
        }
    }
}

export const globalScope = new Scope("global").importModule(Module.global);

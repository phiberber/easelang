import {ESFunction} from "@interpreter/memory/objects/ESFunction";
import {ESObject} from "@interpreter/memory/objects/ESObject";
import {JavaScriptModule} from "@interpreter/modules/js";
import {HttpModule} from "@interpreter/modules/http";
import {GlobalModule} from "@interpreter/modules/global";

export function translateToES(key: string, value: any): ESObject {
    if(value == null) return ESObject.null
    if(value instanceof ESObject) return value
    if(typeof value === "object") {
        const keys = Object.getOwnPropertyNames(value)
        const object = new ESObject({})
        for(const key of keys) object.setProperty(key, translateToES(key, value[key]))
        return object
    } else if(typeof value === "function") {
        return new ESFunction(key, value as Function)
    } else return new ESObject(value)
}

export class Module {

    public static list: Map<string, Module> = new Map()
    public name: string
    public exported: { [key: string]: ESObject }

    static js: Module;
    static global: Module;
    static http: Module;

    public constructor(name: string, exportedNodes: { [key: string]: ESObject }) {
        this.name = name
        this.exported = exportedNodes
    }

    public static register(module: Module): Module {
        // @ts-ignore
        Module[module.name] = module
        Module.list.set(module.name, module)
        return module
    }

    public static fromNative(name: string, content: Object): Module {
        const declared: { [key: string]: ESObject } = {}
        const entries = Object.entries(content)
        for(const [name, value] of entries) declared[name] = translateToES(name, value)
        return new Module(name, declared)
    }

}

Module.register(JavaScriptModule())
Module.register(HttpModule())
Module.register(GlobalModule())
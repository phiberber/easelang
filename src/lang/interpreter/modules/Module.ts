import {JavaScriptModule} from "@/lang/interpreter/modules/impl/jstd.ts"
import {GlobalModule} from "@/lang/interpreter/modules/impl/global.ts"

export class Module {

    public static list: Map<string, Module> = new Map()
    public name: string
    public exported: { [key: string]: any } = {}

    static js: Module;
    static global: Module;
    static browser: Module;
    static http: Module;

    public constructor(name: string, exportedNodes: { [key: string]: any }) {
        this.name = name
        this.exported = exportedNodes
    }

    public static register(module: Module): Module {
        // @ts-ignore
        Module[module.name] = module
        Module.list.set(module.name, module)
        return module
    }

    public static createModule(name: string, content: Object): Module {
        return new Module(name, content)
    }

}

Module.register(JavaScriptModule())
Module.register(GlobalModule())
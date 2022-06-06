import {JavaScriptModule} from "@interpreter/modules/js";
import {HttpModule} from "@interpreter/modules/http";
import {GlobalModule} from "@interpreter/modules/global";
import {BrowserModule} from "@interpreter/modules/browser";

export class Module {

    public static list: Map<string, Module> = new Map()
    public name: string
    public exported: { [key: string]: any }

    static js: Module;
    static global: Module;
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
Module.register(HttpModule())
Module.register(GlobalModule())
Module.register(BrowserModule())
import {Module} from "@/lang/interpreter/modules/Module";

export const JavaScriptModule = () =>
    Module.createModule('js', { console, Math, Date })
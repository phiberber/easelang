import Module from "@interpreter/modules/Module";

export const JavaScriptModule = () =>
    Module.fromNative('js', { console })
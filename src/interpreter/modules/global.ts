import Module from "@interpreter/modules/Module";

export const GlobalModule = () =>
    Module.fromNative('global', {
        print(...args: any[]) {
            console.log(...arguments);
        }
    })
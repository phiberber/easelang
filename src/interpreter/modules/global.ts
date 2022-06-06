import {Module} from "@interpreter/modules/Module";

export const GlobalModule = () =>
    Module.createModule('global', {
        print(...args: any[]) {
            console.log(...arguments);
        },
        range(start: number, end: number) {
            return Array.from({length: end - start}, (_, i) => i + start);
        }
    })
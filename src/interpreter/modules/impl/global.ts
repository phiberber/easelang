import { defineNonEnumerable } from "@/shared/misc/define";
import { alsoFunction, applyFunction, letFunction, runFunction } from "@/shared/misc/scopeFunctions";
import {Module} from "@interpreter/modules/Module";

defineNonEnumerable(Object.prototype, "let", letFunction)
defineNonEnumerable(Object.prototype, "also", alsoFunction)
defineNonEnumerable(Object.prototype, "apply", applyFunction)
defineNonEnumerable(Object.prototype, "run", runFunction)

export const GlobalModule = () =>
    Module.createModule('global', {
        print(...args: any[]) {
            console.log(...arguments);
        },
        range(start: number, end: number) {
            return Array.from({length: end - start}, (_, i) => i + start);
        }
    })
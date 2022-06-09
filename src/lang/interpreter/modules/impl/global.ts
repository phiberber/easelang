import { defineNonEnumerable } from "@/lang/shared/misc/define";
import { alsoFunction, applyFunction, letFunction, runFunction } from "@/lang/shared/misc/scopeFunctions";
import {Module} from "@/lang/interpreter/modules/Module";

defineNonEnumerable(Object.prototype, "let", letFunction)
defineNonEnumerable(Object.prototype, "also", alsoFunction)
defineNonEnumerable(Object.prototype, "apply", applyFunction)
defineNonEnumerable(Object.prototype, "run", runFunction)

export const GlobalModule = () =>
    Module.createModule('global', {
        print(...args: any[]) {
            console.log(...arguments);
        },
        with<T, E>(object: T, callback: (it: T) => E) {
            return callback.call(this, object);
        },
        range(start: number, end: number) {
            return Array.from({length: end - start + 1}, (_, i) => i + start);
        }
    })
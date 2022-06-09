import {Module} from "@/lang/interpreter/modules/Module";

export const BrowserModule = () =>
    Module.createModule('browser', { document, window })
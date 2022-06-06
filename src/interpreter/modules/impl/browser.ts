import {Module} from "@interpreter/modules/Module";

export const BrowserModule = () =>
    Module.createModule('browser', { document, window })
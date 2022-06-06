import {Module} from "@interpreter/modules/Module";

const safeWindow = typeof window !== "undefined" ? window : { undefined: true }
const safeDocument = typeof document !== "undefined" ? document : { undefined: true }

export const BrowserModule = () =>
    Module.createModule('browser', { document: safeDocument, window: safeWindow })
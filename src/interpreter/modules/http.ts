import {Module} from "@interpreter/modules/Module";
import http from "express"

export const HttpModule = () =>
    Module.fromNative('http', { http })
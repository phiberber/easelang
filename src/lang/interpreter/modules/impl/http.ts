import {Module} from "@/lang/interpreter/modules/Module";
import http from "express"

export const HttpModule = () =>
    Module.createModule('http', { http })

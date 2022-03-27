import { ESObject } from "./ESObject";

export class ESFunction extends ESObject {

    readonly name: string

    constructor(name: string, value: Function) {
        super({});
        this.name = name
        this.value = value
    }

}
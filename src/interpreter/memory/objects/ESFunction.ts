import ESObject from "@interpreter/memory/objects/ESObject";

export default class ESFunction extends ESObject {

    readonly name: string

    constructor(name: string, value: Function) {
        super({});
        this.name = name
        this.value = value
    }

}
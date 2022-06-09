import {BaseNode} from "@/lang/shared/nodes/BaseNode";
import {Span} from "@/lang/shared/Span";

export class AbstractParseTree extends BaseNode {

    public body: BaseNode[]

    public constructor(body: BaseNode[], span: Span) {
        super(span);
        this.body = body;
    }

}
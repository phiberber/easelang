import {LiteralExpression} from "@/lang/shared/nodes/literal/LiteralExpression";
import {Span} from "@/lang/shared/Span";
import {Tag} from "@/lang/shared/Tag";

export class StringLiteral extends LiteralExpression<string> {

    constructor(value: string, span: Span) {
        super(Tag.String, value, span);
    }

}
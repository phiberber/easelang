import {LiteralExpression} from "@/lang/shared/nodes/literal/LiteralExpression";
import {Span} from "@/lang/shared/Span";
import {Tag} from "@/lang/shared/Tag";

export class BooleanLiteral extends LiteralExpression<boolean> {

    constructor(value: boolean, span: Span) {
        super(Tag.Boolean, value, span);
    }

}
import {Span} from "@/lang/shared/Span";
import {LiteralExpression} from "@/lang/shared/nodes/literal/LiteralExpression";
import {Tag} from "@/lang/shared/Tag";

export class IdentifierLiteral extends LiteralExpression<string> {

    public static empty = new IdentifierLiteral("", Span.empty)

    public constructor(value: string, span: Span) {
        super(Tag.Identifier, value, span);
    }

}
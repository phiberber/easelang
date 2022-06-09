import {BaseNode} from "@/lang/shared/nodes/BaseNode";
import {Span} from "@/lang/shared/Span";

export abstract class Expression extends BaseNode {

    public static readonly empty: Expression = { type: "Expression", span: Span.empty }

}
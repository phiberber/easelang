/**
 * @author: Peixe
 * @description: A Tag is the predecessor of Tokens. They are used to identifying sequences in the tokenizer/lexer process.
 * @example: Tag.String, Tag.Number, Tag.Identifier
 */

class Tag {
    content: string | string[] | Function
    symbol: symbol

    static Space = this.create(" ", "Space")
    static Tab = this.create("\t", "Tab")

    static OpenParenthesis = this.create("(", "Open Parenthesis")
    static CloseParenthesis = this.create(")", "Close Parenthesis")

    static OpenBraces = this.create("{", "Open Braces")
    static CloseBraces = this.create("}", "Close Braces")

    static OpenBrackets = this.create("[", "Open Brackets")
    static CloseBrackets = this.create("]", "Close Brackets")

    static SafeDot = this.create("?.", "Safe Dot")
    static Dot = this.create(".", "Dot")
    static Comma = this.create(",", "Comma")
    static Colon = this.create(":", "Colon")
    static SemiColon = this.create(";", "Semi Colon")

    static New = this.create("new", "New")
    static Return = this.create("return", "Return")

    static If = this.create("if", "If")
    static Else = this.create("else", "Else")
    static In = this.create("in", "In")
    static Is = this.create("is", "Is")
    static Pass = this.create("pass", "Pass")
    static While = this.create("while", "While")
    static Break = this.create("break", "Break")
    static Continue = this.create("continue", "Continue")

    /**
     * Bitwise Operators:
     *
     * Did not manage to find a way to implement bitwise operators in the syntax
     * Without making them look similar to boolean operators.
     *
     * Operators should have a big distinction between themselves.
     * This is the base syntax of them:
     *
     * static And = this.create("&", "Bitwise And")
     * static Or = this.create("|", "Bitwise Or")
     *
     * static Not = this.create("~", "Bitwise Not")
     * static Xor = this.create("^", "Bitwise Xor")
     *
     */

    static BitwiseShr = this.create(">>", "Bitwise shr")
    static BitwiseShl = this.create("<<", "Bitwise shl")

    static BitwiseRor = this.create("~>", "Bitwise ror")
    static BitwiseRol = this.create("<~", "Bitwise rol")

    static Interrogation = this.create("?", "Interrogation")
    static Elvis = this.create("?:", "Elvis")

    static LineBreak = this.create(["\n", "\r\n"], "Line Break")

    static Class = this.create("class", "Class")
    static Function = this.create("fun", "Function")
    static Value = this.create("val", "Value")
    static Constant = this.create("var", "Constant")
    static Variable = this.create("const", "Variable")

    static External = this.create("external", "External")

    static Addition = this.create("+", "Addition")
    static Subtraction = this.create("-", "Subtraction")
    static Multiplication = this.create("*", "Multiplication")
    static Division = this.create("/", "Division")
    static Remainer = this.create("%", "Remainer")

    static Increment = this.create("++", "Increment")
    static Decrement = this.create("--", "Decrement")

    static BooleanOr = this.create("||", "Boolean Or")
    static BooleanNot = this.create("!", "Boolean Not")
    static BooleanAnd = this.create("&&", "Boolean And")

    static Less = this.create("<", "Less")
    static Greater = this.create(">", "Greater")

    static LessOrEqual = this.create("<=", "Less or Equal")
    static GreaterOrEqual = this.create(">=", "Greater or Equal")

    static Equals = this.create("==", "Equals")
    static NotEquals = this.create("!=", "Not Equals")

    static Assign = this.create("=", "Assign")

    static AssignPlus = this.create("+=", "Plus Assign")
    static AssignMinus = this.create("-=", "Minus Assign")
    static AssignMultiplied = this.create("*=", "Multiplied Assign")
    static AssignDivided = this.create("/=", "Divided Plus")
    static AssignRemained = this.create("%=", "Remained Plus")

    static Boolean = this.create(["true", "false"], "Boolean")

    static Identifier = this.create(undefined, "Identifier")
    static String = this.create(undefined, "String")
    static Integer = this.create(undefined, "Integer")
    static Float = this.create(undefined, "Float")

    constructor(content: string | string[], description: string) {
        this.content = content
        this.symbol = Symbol.for(description)
    }

    static create(content: string | string[], description: string): Tag {
        return new Tag(content, description)
    }
}

export const Tags = Object.values(Tag)

export const KeywordTags = [Tag.If, Tag.Else, Tag.In, Tag.Is, Tag.Break, Tag.Continue, Tag.Pass]

export const GreatnessTags = [Tag.Greater, Tag.GreaterOrEqual, Tag.Less, Tag.LessOrEqual]
export const EqualityTags = [Tag.Equals, Tag.NotEquals]

export const PrimaryArithmeticalTags = [Tag.Addition, Tag.Subtraction]
export const SecondaryArithmeticalTags = [Tag.Multiplication, Tag.Division, Tag.Remainer]

export const ArithmeticalTags = [Tag.Addition, Tag.Subtraction, Tag.Multiplication, Tag.Division, Tag.Remainer]

export const UnaryTags = [Tag.Increment, Tag.Decrement]
export const AssignmentTags = [Tag.Assign, Tag.AssignPlus, Tag.AssignMinus, Tag.AssignMultiplied, Tag.AssignDivided, Tag.AssignRemained]
export const RelationTags = GreatnessTags.concat(EqualityTags)

export const Modifiers: Tag[] = [Tag.External]

export const NumberTags = [Tag.Integer, Tag.Float]

export default Tag
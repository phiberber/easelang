/**
 * @author: Peixe
 * @description: A Tag is the predecessor of Tokens. They are used to identifying sequences in the tokenizer/lexer process.
 * @example: Tag.String, Tag.Number, Tag.Identifier
 */

export class Tag {

    public content: string | string[] | undefined
    public symbol: symbol
    public keyword: boolean

    static Space = this.create(" ", "Space")
    static Tab = this.create("\t", "Tab")

    static Arrow = this.create("->", "Arrow")

    static OpenParenthesis = this.create("(", "Open Parenthesis")
    static CloseParenthesis = this.create(")", "Close Parenthesis")

    static OpenBraces = this.create("{", "Open Braces")
    static CloseBraces = this.create("}", "Close Braces")

    static OpenBrackets = this.create("[", "Open Brackets")
    static CloseBrackets = this.create("]", "Close Brackets")

    static ChainDot = this.create("?.", "Safe Dot")
    static Dot = this.create(".", "Dot")
    static Comma = this.create(",", "Comma")
    static Colon = this.create(":", "Colon")
    static SemiColon = this.create(";", "Semi Colon")

    static New = this.create("new", "New")
    static Return = this.create("return", "Return")

    static If = this.create("if", "If", true)
    static Else = this.create("else", "Else", true)
    static As = this.create("as", "As", true)
    static From = this.create("from", "From", true)
    static In = this.create("in", "In", true)
    static Is = this.create("is", "Is", true)
    static Pass = this.create("pass", "Pass", true)
    static Import = this.create("import", "Import", true)
    static While = this.create("while", "While", true)
    static For = this.create("for", "For", true)
    static When = this.create("when", "When", true)
    static Break = this.create("break", "Break", true)
    static Continue = this.create("continue", "Continue", true)

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

    static Class = this.create("class", "Class", true)
    static Function = this.create("fun", "Function", true)
    static Value = this.create("val", "Value", true)
    static Variable = this.create("let", "Variable", true)
    static Constant = this.create("const", "Constant", true)

    static External = this.create("external", "External", true)

    static Increment = this.create("++", "Increment")
    static Decrement = this.create("--", "Decrement")

    static AssignPlus = this.create("+=", "Plus Assign")
    static AssignMinus = this.create("-=", "Minus Assign")
    static AssignMultiplied = this.create("*=", "Multiplied Assign")
    static AssignDivided = this.create("/=", "Divided Plus")
    static AssignRemained = this.create("%=", "Remained Plus")

    static Addition = this.create("+", "Addition")
    static Subtraction = this.create("-", "Subtraction")
    static Multiplication = this.create("*", "Multiplication")
    static Division = this.create("/", "Division")
    static Remainer = this.create("%", "Remainer")

    static BooleanOr = this.create("||", "Boolean Or")
    static BooleanNot = this.create("!", "Boolean Not")
    static BooleanAnd = this.create("&&", "Boolean And")

    static LessOrEqual = this.create("<=", "Less or Equal")
    static GreaterOrEqual = this.create(">=", "Greater or Equal")

    static Less = this.create("<", "Less")
    static Greater = this.create(">", "Greater")

    static Equals = this.create("==", "Equals")
    static NotEquals = this.create("!=", "Not Equals")

    static Assign = this.create("=", "Assign")

    static Integer = this.create(undefined, "Integer")
    static Float = this.create(undefined, "Float")
    static Identifier = this.create(undefined, "Identifier")
    static Boolean = this.create(["true", "false"], "Boolean", true)
    static String = this.create(undefined, "String")

    constructor(content: string | string[] | undefined, description: string, keyword: boolean = false) {
        this.content = content
        this.symbol = Symbol.for(description)
        this.keyword = keyword
    }

    static create(content: string | string[] | undefined, description: string, keyword: boolean = false): Tag {
        return new Tag(content, description, keyword)
    }
}

export const Tags: Tag[] = Object.values(Tag)

export const GreatnessTags = [Tag.GreaterOrEqual, Tag.Greater, Tag.LessOrEqual, Tag.Less]
export const EqualityTags = [Tag.Equals, Tag.NotEquals]

export const PrimaryArithmeticalTags = [Tag.Addition, Tag.Subtraction]
export const SecondaryArithmeticalTags = [Tag.Multiplication, Tag.Division, Tag.Remainer]

export const ArithmeticalTags = [Tag.Addition, Tag.Subtraction, Tag.Multiplication, Tag.Division, Tag.Remainer]

export const PostUnaryTags = [Tag.Increment, Tag.Decrement]
export const PreUnaryTags = [Tag.BooleanNot, Tag.Increment, Tag.Decrement, Tag.Addition, Tag.Subtraction, ...PostUnaryTags]
export const AssignmentTags = [Tag.Assign, Tag.AssignPlus, Tag.AssignMinus, Tag.AssignMultiplied, Tag.AssignDivided, Tag.AssignRemained]
export const ComparisonTags = GreatnessTags.concat(EqualityTags)

export const Modifiers: Tag[] = [Tag.External]

export const NumberTags = [Tag.Integer, Tag.Float]
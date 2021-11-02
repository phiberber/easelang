import tokenTypes from "./tokenTypes";

export default {

    Parenthesis: [tokenTypes.OpenParenthesis, tokenTypes.CloseParenthesis],
    Brackets: [tokenTypes.OpenBrackets, tokenTypes.CloseBrackets],

    Keywords: [tokenTypes.If, tokenTypes.Else, tokenTypes.Break, tokenTypes.Pass],

    ArithmeticalOperators: [tokenTypes.Plus, tokenTypes.Minus, tokenTypes.Multiply, tokenTypes.Divide, tokenTypes.Remainder],

    UnaryOperators: [tokenTypes.Increment, tokenTypes.Decrease],
    RelationalOperators: [tokenTypes.Smaller, tokenTypes.SmallerOrEqual, tokenTypes.Bigger, tokenTypes.BiggerOrEqual, tokenTypes.Equals, tokenTypes.NotEquals],
    AssignmentOperators: [tokenTypes.PlusAssign, tokenTypes.MinusAssign, tokenTypes.MultiplyAssign, tokenTypes.DivideAssign, tokenTypes.RemainderAssign],

}
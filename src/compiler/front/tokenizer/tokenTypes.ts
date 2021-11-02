import TokenType from "./tokenType";

export default {

    Space: new TokenType('Space', ' '),
    Assign: new TokenType('Assign', '='),

    OpenParenthesis: new TokenType('OpenParenthesis', '('),
    CloseParenthesis: new TokenType('CloseParenthesis', ')'),

    OpenBrackets: new TokenType('OpenBrackets', '{'),
    CloseBrackets: new TokenType('CloseBrackets', '}'),

    Comma: new TokenType('Comma', ','),
    Colon: new TokenType('Colon', ':'),

    If: new TokenType('If', 'if'),
    Else: new TokenType('Else', 'else'),
    Break: new TokenType('Break', 'break'),
    Pass: new TokenType('Pass', 'pass'),

    Ternary: new TokenType('Ternary', '?:'),

    LineBreak: new TokenType('LineBreak', /\n|\n\r/),

    Number: new TokenType('Number', /\d/),
    Identifier: new TokenType('Identifier', /\w/),

    Plus: new TokenType('Plus', '+'),
    Minus: new TokenType('Minus', '-'),
    Divide: new TokenType('Divide', '/'),
    Multiply: new TokenType('Multiply', '*'),
    Remainder: new TokenType('Remainder', '%'),

    Increment: new TokenType('Increment', '++'),
    Decrease: new TokenType('Decrease', '--'),

    Smaller: new TokenType('Smaller', '<'),
    SmallerOrEqual: new TokenType('SmallerOrEqual', '<='),
    Bigger: new TokenType('Bigger', '>'),
    BiggerOrEqual: new TokenType('BiggerOrEqual', '>='),
    Equals: new TokenType('Equals', '=='),
    NotEquals: new TokenType('NotEquals', '!='),

    PlusAssign: new TokenType("PlusAssign", "+="),
    MinusAssign: new TokenType("MinusAssign", "-="),
    MultiplyAssign: new TokenType("MultiplyAssign", "*="),
    DivideAssign: new TokenType("DivideAssign", "/="),
    RemainderAssign: new TokenType("RemainderAssign", "%=")

}
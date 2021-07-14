export default {

    Space: ' ',
    Assign: '=',

    OpenParenthesis: '(',
    CloseParenthesis: ')',

    OpenBrackets: '{',
    CloseBrackets: '}',

    Comma: ',',
    Colon: ':',

    If: 'if',
    Else: 'else',
    Break: 'break',
    Pass: 'pass',

    TernaryOperator: '?:',

    LineBreak: /\n|\n\r/,

    Number: /\d/,
    Identifier: /\w/,
    UnaryOperator: /\+\+|--/,
    RelationalOperator: /<|<=|>|>=|==|!=/,
    LogicalOperator: /[^~&|]/,
    AssignmentOperator: /=|\+=|-=|\*=|\/=|%=/,
    ArithmeticOperator: /[+-\/*%]/,
    BitwiseOperator: /&|\||<<|>>|~|\^/,

}

console.log(/[+-\/*]/.test('1 / 1 + 2 ( - 5 )'))
use crate::lang::tokenizer::token::token_holder;
use crate::lang::tokenizer::token::token_holder::TokenHolder;

macro_rules! lazy_token {
    () => {
        return TokenHolder {};
    };
}

macro_rules! implement_token {
    ($($args: expr),*) => {{
        let token_type: TokenHolder = TokenHolder::new();
        $(
            token_type.hold($args);
        )*
        return token_type
    }};
}

// Miscellaneous

pub const SPACE: TokenHolder = implement_token!(' ');

pub const LINE_BREAK: TokenHolder = implement_token!('\n', "\n\r");

pub const COMMENT: TokenHolder = implement_token!('#', "//", "/*", "/**");
pub const COMMENT_END: TokenHolder = implement_token!("*/");

// Operators

pub const PLUS: TokenHolder = implement_token!('+');
pub const MINUS: TokenHolder = implement_token!('-');
pub const MULTIPLY: TokenHolder = implement_token!('*');
pub const DIVIDE: TokenHolder = implement_token!('/');

// Symbol

pub const DOT: TokenHolder = implement_token!('.');

pub const ASSIGN: TokenHolder = implement_token!('=');
pub const QUOTE: TokenHolder = implement_token!('\'', '"');

pub const OPEN_PARENTHESIS: TokenHolder = implement_token!('(');
pub const CLOSE_PARENTHESIS: TokenHolder = implement_token!(')');

pub const OPEN_BRACKET: TokenHolder = implement_token!('{');
pub const CLOSE_BRACKET: TokenHolder = implement_token!('}');

pub const INTERROGATION: TokenHolder = implement_token!('?');
pub const HASHTAG: TokenHolder = implement_token!('#');
pub const COMMA: TokenHolder = implement_token!(',');
pub const COLON: TokenHolder = implement_token!(':');
pub const SEMI_COLON: TokenHolder = implement_token!(';');

// Conditional

pub const EQUALS: TokenHolder = implement_token!("==");
pub const NOT_EQUAL: TokenHolder = implement_token!("!=");

pub const LOWER: TokenHolder = implement_token!('>');
pub const HIGHER: TokenHolder = implement_token!('<');

pub const LOWER_OR_EQUAL: TokenHolder = implement_token!("<=");
pub const HIGHER_OR_EQUAL: TokenHolder = implement_token!(">=");

pub const BOOLEAN_NOT: TokenHolder = implement_token!("!");
pub const BOOLEAN_AND: TokenHolder = implement_token!("&&");
pub const BOOLEAN_OR: TokenHolder = implement_token!("||");

// Bitwise Operators

pub const BYTE_XOR: TokenHolder = implement_token!("^");
pub const BYTE_NOT: TokenHolder = implement_token!("~");
pub const BYTE_AND: TokenHolder = implement_token!("&");
pub const BYTE_OR: TokenHolder = implement_token!("|");

pub const BYTE_SHIFT_LEFT: TokenHolder = implement_token!("<<");
pub const BYTE_SHIFT_RIGHT: TokenHolder = implement_token!(">>");

// Keywords

pub const FINAL: TokenHolder = implement_token!("final");
pub const ABSTRACT: TokenHolder = implement_token!("abstract");

pub const VARIABLE: TokenHolder = implement_token!("var");
pub const VALUE: TokenHolder = implement_token!("val");
pub const pub const: TokenHolder = implement_token!("pub const");

pub const CLASS: TokenHolder = implement_token!("class");
pub const FUNCTION: TokenHolder = implement_token!("fun");

pub const IF: TokenHolder = implement_token!("if");
pub const ELSE: TokenHolder = implement_token!("else");

// Visibility

pub const PUBLIC: TokenHolder = implement_token!("public");
pub const PRIVATE: TokenHolder = implement_token!("private");
pub const SCOPED: TokenHolder = implement_token!("scoped");
pub const STATIC: TokenHolder = implement_token!("static");

// Types

pub const CHAR: TokenHolder = lazy_token!();
pub const STRING: TokenHolder = lazy_token!();
pub const INTEGER: TokenHolder = lazy_token!();
pub const FLOAT: TokenHolder = lazy_token!();
pub const DOUBLE: TokenHolder = lazy_token!();
pub const SHORT: TokenHolder = lazy_token!();
pub const BYTE: TokenHolder = lazy_token!();
pub const HEX: TokenHolder = lazy_token!();

pub const IDENTIFIER: TokenHolder = lazy_token!();
pub const ANY: TokenHolder = lazy_token!();

pub const UNKNOWN: TokenHolder = lazy_token!();
use std::iter::Map;
use crate::utils::also::Also;
use crate::lang::tokenizer::token::token_holder::TokenHolder;
use crate::lang::tokenizer::token::token_types::{COMMENT, LINE_BREAK};

#[derive(Copy, Clone)]
pub struct TokenType<'lifetime> {
    pub id: usize,
    pub content: &'lifetime str,
    pub len: usize
}

impl TokenType {

    pub fn is(&self, token_holder: TokenHolder) -> bool { self.id == token_holder.id }
    pub fn is_invalid(&self) -> bool { self.len <= 0 }

}
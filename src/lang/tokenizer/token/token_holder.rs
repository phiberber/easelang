use crate::lang::tokenizer::token::token_type::TokenType;

pub const TOKENS: Vec<TokenType> = vec![];

pub struct TokenHolder<'lifetime> {
    pub id: usize,
    pub token_types: Vec<TokenType<'lifetime>>
}

impl TokenHolder {

    pub fn new() -> TokenHolder {
        TokenHolder {
            id: TOKENS.len(),
            token_types: vec![]
        }
    }

    pub fn hold(&mut self, token: &str) -> TokenType {
        self.push(TokenType {
            id: self.id,
            content: token,
            len: token.len()
        })
    }

    fn push(&mut self, token_type: TokenType) -> TokenType {
        TOKENS.push(token_type);
        self.token_types.push(token_type);
        token_type
    }

    fn is_holding(&self, token_type: TokenType) -> bool { token_type.id == self.id }
    fn is_empty(&self) -> bool { self.token_types.is_empty() }

}
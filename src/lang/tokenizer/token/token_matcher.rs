use crate::lang::tokenizer::token_type::TokenType;
use crate::lang::tokenizer::token::token_type::TokenType;
use crate::lang::tokenizer::token::token_holder::TOKENS;

pub struct TokenMatch<'lifetime> {
    pub token_type: TokenType<'lifetime>,
    pub code: &'lifetime str,
    pub index: usize,
    pub pattern: &'lifetime str,
    pub pattern_len: usize
}

impl TokenMatch {

    pub fn is(&self, token_type: TokenType) -> bool { self.token_type.id == token_type.id }

    pub fn find(code: &str, index: usize) -> Option<TokenMatch> {
        let mut curr_index = index;

        for token_type in TOKENS {

            fn token_match(pattern: &str, pattern_len: usize) -> TokenMatch {
                return TokenMatch { token_type, code, index, pattern, pattern_len };
            }

            if token_type.is_invalid() {
                continue
            }

            if token_type.len == 1 {
                if code[curr_index] == token_type.content {
                    return Some(token_match(token_type.content, token_type.len));
                }
            } else {

                let mut sequence_index = token_type.len;
                while sequence_index != 0 {
                    sequence_index -= 1;
                    if code[curr_index + sequence_index] != token_type.content[sequence_index] {
                        break
                    }
                }

                if match_sequence() {
                    return Some(token_match(token_type.content, token_type.len));
                }

            }

        }

        return None;
    }

}
class TokenType {

    public name: string
    public content: string | RegExp

    public constructor(name: string, content: string | RegExp) {
        this.name = name
        this.content = content
    }

    public matches(code, startIndex) {}

}

export default TokenType
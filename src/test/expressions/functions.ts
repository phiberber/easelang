import {suite, test} from "uvu";
import * as assert from "uvu/assert"
import {evaluate} from "@/Ease";
import {Scope} from "@/lang/interpreter/memory/Scope";

const scope = new Scope("intermediate")
const functionDeclarations = suite("Function declarations")

const prepareScope = () => {
    evaluate("fun join(a?, b = 'ed'): a + b", scope)
    evaluate("fun execute(callback): callback()", scope)
}

prepareScope()

functionDeclarations("Function with braces", () => {
    assert.instance(evaluate("fun join(a, b) { a + b }"), Function)
})

functionDeclarations("Function with braces", () => {
    assert.instance(evaluate("fun join(a, b) { a + b }"), Function)
})

functionDeclarations("Function with colon", () => {
    assert.instance(evaluate("fun join(a, b): a + b"), Function)
})

functionDeclarations("Function with assigned parameters and braces", () => {
    assert.instance(evaluate("fun join(a = 'Join', b = 'ed') { a + b }"), Function)
})

functionDeclarations("Function with assigned parameter and colon", () => {
    assert.instance(evaluate("fun join(a, b = 'ed'): a + b"), Function)
})

functionDeclarations("Function with optional, assigned parameter and colon", () => {
    assert.instance(evaluate("fun join(a?, b = 'ed'): a + b"), Function)
})

functionDeclarations("Function with inner callback call", () => {
    assert.instance(evaluate("fun execute(callback): callback()"), Function)
})

const functionCalls = suite("Function calls")

functionCalls("Function call with two parameters", () => {
    assert.equal(evaluate(`join('Hello', 'World')`, scope), "HelloWorld")
})

functionCalls("Function call with one parameter only", () => {
    assert.equal(evaluate(`join('Animat')`, scope), "Animated")
})

functionCalls("Anonymous functions as variables", () => {
    assert.equal(evaluate(`
        let anonymousSum = { a, b -> a + b }
        anonymousSum(1, 2)
    `, scope), 3)
})

functionCalls("Function with anonymous function as outside parameter", () => {
    assert.equal(evaluate(`execute { 1 }`, scope), 1)
})

functionCalls("Member expression with function call after anonymous function", () => {
    assert.equal(evaluate(`execute { 1 }.let { 2 }`, scope), 2)
})

functionCalls("Member expression with anonymous function inside parameters", () => {
    assert.equal(evaluate(`execute({ 1 }).let({ 3 })`, scope), 3)
})

functionDeclarations.run()
functionCalls.run()
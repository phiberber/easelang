import * as assert from "uvu/assert";
import {evaluate} from "@/Ease";
import {suite} from "uvu";
import {Scope} from "@/lang/interpreter/memory/Scope";

const scope = new Scope("intermediate")
const deepEqual = (a, b) => assert.equal(JSON.stringify(a), JSON.stringify(b))
const assertion = { ...assert, deepEqual }

const prepareScope = () => {
    evaluate("let a = 1", scope)
    evaluate("let b = 'Ease'", scope)
    evaluate("let c = false", scope)
    evaluate("let d = .075", scope)
}

prepareScope()

const arrays = suite("Simple Arrays");

arrays("No elements", () => {
    assertion.deepEqual(evaluate `[]`, [])
})

arrays("With literal Elements", () => {
    assertion.deepEqual(evaluate(`[a, b]`, scope), [1, 'Ease'])
})

const twoDimensional = suite("Two dimensional arrays");

twoDimensional("With no elements", () => assertion.deepEqual(evaluate(`[[]]`, scope),[[]]))

twoDimensional("With elements", () => {
    assertion.deepEqual(evaluate(`[[1]]`, scope),[[1]])
    assertion.deepEqual(evaluate(`[[c]]`, scope),[[false]])
})

const computed = suite("Computed arrays");

computed("Mapped inner 2D array", () => {
    assertion.deepEqual(evaluate(`[[1].map {2}]`, scope),[[2]])
})

computed("Generated array", () => {
    assertion.deepEqual(evaluate(`range(1, 10).map { it * 2 }`, scope),[2, 4, 6, 8, 10, 12, 14, 16, 18, 20])
})

computed("Sum of array", () => {
    assertion.deepEqual(evaluate(`
        let start = 1
        let end = 30
        range(start, end).reduce({ a, b -> a + b }, 0)
    `)[1],465)
})

arrays.run()
twoDimensional.run()
computed.run()

import {test, suite} from "uvu";
import * as assert from "uvu/assert"
import {evaluate} from "@/Ease";
import {Scope} from "@/lang/interpreter/memory/Scope";

const scope = new Scope("intermediate")
const conditional = suite("Conditional with no alternates")

const prepareScope = () => {
    evaluate("let sample = true", scope)
}

prepareScope()

conditional("Using colon and parenthesis", () => {
    assert.equal(evaluate(`if(true): true`, scope), true)
    assert.equal(evaluate(`if(sample): true`, scope), true)
    assert.equal(evaluate(`if(false): false`, scope), undefined)
    assert.equal(evaluate(`if(5): 4`, scope), 4)
})

// @Todo: Parenthesis-less statements
// conditional("Using colon but not using parenthesis", () => {
//     assert.equal(evaluate(`if true: true`, scope), true)
//     assert.equal(evaluate(`if sample: true`, scope), true)
//     assert.equal(evaluate(`if false: false`, scope), undefined)
//     assert.equal(evaluate(`if 5: 4`, scope), 4)
// })

conditional("Using braces and parenthesis", () => {
    assert.equal(evaluate(`if(true) { true }`, scope), true)
    assert.equal(evaluate(`if(sample) { true }`, scope), true)
    assert.equal(evaluate(`if(false) { false }`, scope), undefined)
    assert.equal(evaluate(`if(5) { 4 }`, scope), 4)
})

// @Todo: Parenthesis-less statements
// conditional("Using braces but not parenthesis", () => {
//     assert.equal(evaluate(`if true { true }`, scope), true)
//     assert.equal(evaluate(`if sample { true }`, scope), true)
//     assert.equal(evaluate(`if false { false }`, scope), undefined)
//     assert.equal(evaluate(`if 5 { 4 }`, scope), 4)
// })

conditional.run()
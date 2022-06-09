import { test, suite } from "uvu";
import * as assert from "uvu/assert"
import {evaluate} from "@/Ease";

const integers = suite("Integer literals")

integers("Positive Integer Literals", () => {
    assert.is(evaluate `0`, 0)
    assert.is(evaluate `1`, 1)
    assert.is(evaluate `25`, 25)
    assert.is(evaluate `+125`, 125)
})

integers("Negative Integer Literals", () => {
    assert.is(evaluate `-0`, 0)
    assert.is(evaluate `-1`, -1)
    assert.is(evaluate `-25`, -25)
    assert.is(evaluate `-125`, -125)
})

const floats = suite("Floating point literals")

floats("Positive Float Numbers", () => {
    assert.is(evaluate `0.25`, 0.25)
    assert.is(evaluate `.75`, .75)
    assert.is(evaluate `1.43`, 1.43)
    assert.is(evaluate `+17.9825`, 17.9825)
})

floats("Negative Float Numbers", () => {
    assert.is(evaluate `-0.25`, -0.25)
    assert.is(evaluate `-.75`, -.75)
    assert.is(evaluate `-1.43`, -1.43)
    assert.is(evaluate `-17.9825`, -17.9825)
})

integers.run()
floats.run()
import { test, suit } from "uvu";
import * as assert from "uvu/assert"
import {evaluate} from "@/Ease";

test("String Literals", () => {
    assert.is(evaluate `"Double Quotes!"`, "Double Quotes!")
    // assert.is(evaluate `"Double Escaped \" Quotes!"`, "Double Escaped \" Quotes!")

    assert.is(evaluate `'Single Quotes!'`, 'Single Quotes!')
    // assert.is(evaluate `'Single Escaped \' Quotes!'`, 'Single Escaped \' Quotes!')
})

test.run()
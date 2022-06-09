import * as assert from "uvu/assert";
import {evaluate} from "@/Ease";
import {suite} from "uvu";

const concatenation = suite("String concatenation");

concatenation("Simple and double quote", () => {
    assert.is(evaluate `"Hi" + " " + "mom! I am on Github!"`, "Hi mom! I am on Github!")
    assert.is(evaluate `'Hi' + ' ' + 'mom! I am on Github!'`, "Hi mom! I am on Github!")

    // @Todo: Escape characters
    // assert.is(evaluate `'Single Quotes!'`, 'Single Quotes!')
    // assert.is(evaluate `'Single Escaped \' Quotes!'`, 'Single Escaped \' Quotes!')
})

concatenation.run()
import {isNumber} from "@misc/IsNumber";
import {isUpperCase} from "@misc/isUpperCase";
import {isLowerCase} from "@misc/isLowerCase";

export function isValidIdentifierCharacter(char: string): boolean {
    if (char === '$') return true
    if (char === '_') return true
    const charCode = char.codePointAt(0)
    if (charCode == null) return false
    return isNumber(charCode) || isUpperCase(charCode) || isLowerCase(charCode)
}
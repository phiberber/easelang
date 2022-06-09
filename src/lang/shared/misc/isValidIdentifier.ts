import {isNumber} from "@/lang/shared/misc/IsNumber";
import {isUpperCase} from "@/lang/shared/misc/isUpperCase";
import {isLowerCase} from "@/lang/shared/misc/isLowerCase";

export function isValidIdentifierCharacter(char: string): boolean {
    if (char === '$') return true
    if (char === '_') return true
    const charCode = char.codePointAt(0)
    if (charCode == null) return false
    return isNumber(charCode) || isUpperCase(charCode) || isLowerCase(charCode)
}
// @ts-nocheck

/**
 * Instance a zero value of type T.
 *
 * Return zero value if it is primitive type, e.g. "" for string, 0 for integer.
 * Return (unsafe) null if it is reference type.
 * @returns zero value of T
 */
@inline
@unsafe
export function instantiateZero<T>(): T {
    if (isFloat<T>()) {
        return 0;
    } else if (isInteger<T>()) {
        return 0;
    } else if (isBoolean<T>()) {
        return false;
    } else if (isString<T>()) {
        return "";
    }
    return changetype<T>(0);
}
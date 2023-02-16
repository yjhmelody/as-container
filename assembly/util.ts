// @ts-nocheck

/**
 * Instance a zero value of type T.
 *
 * Return zero value if it is primitive type.
 * Return (unsafe) null if it is reference type.
 * Otherwise try to call constructor without arguments for it.
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
    } else if (isReference<T>()) {
        return changetype<T>(0);
    }
    return instantiate<T>();
}
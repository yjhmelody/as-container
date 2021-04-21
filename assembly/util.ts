@inline
export function instantiateZero<T>(): T {
    let t: T;
    if (isFloat(t)) {
        return 0;
    } else if (isInteger(t)) {
        return 0;
    } else if (isBoolean(t)) {
        return false;
    } else {
        return instantiate<T>();
    }
}
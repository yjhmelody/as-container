import { Box } from "./box";
import { Option } from "./option";

export function boxOption<T>(val: T | null): Box<Option<T>> {
    if (val == null) {
        return Box.new(Option.None<T>());
    }
    return new Box(Option.Some(val as T));
}

export function optionCloned<T>(
    opt: Option<Box<T>>
): Option<T> {
    if (opt.isSome) {
        return Option.Some<T>((opt.unwrap()).unwrap());
    }
    return Option.None<T>();
}

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
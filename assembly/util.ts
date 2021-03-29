import { Box, Boxable } from "./box";
import { Option } from "./option";

export function boxOption<T>(val: T | null): Box<Option<T>> {
    if (val == null) {
        return Box.new(Option.None<T>());
    }
    return new Box(Option.Some(val as T));
}

export function optionCloned<T, B extends Boxable<T> = Box<T>>(
    opt: Option<B>
): Option<T> {
    if (opt.isSome) {
        return Option.Some(opt.unwrap().unwrap());
    }
    return Option.None<T>();
}

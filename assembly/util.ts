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

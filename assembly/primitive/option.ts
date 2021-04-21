import { MapFn, RecoveryFn } from "../shared";
import { instantiateZero } from "../util";

type FlatMapFn<T, U> = MapFn<T, Option<U>>;

/**
 * It can wrap any type for T, but it will take up some additional memory space for flag.
 *
 */
export class Option<T> {
    constructor(
        private readonly val: T = instantiateZero<T>(),
        private _isNone: bool = true
    ) {}

    @inline
    static Some<T>(val: T): Option<T> {
        return new Option<T>(val, false);
    }

    @inline
    static None<T>(): Option<T> {
        return new Option<T>(instantiateZero<T>(), true);
    }

    @inline
    get isSome(): bool {
        return !this._isNone;
    }

    @inline
    get isNone(): bool {
        return this._isNone;
    }

    @inline
    unwrap(): T {
        return this.expect("Option: Unwrap none");
    }

    @inline
    expect(msg: string): T {
        assert(this.isSome, msg);
        return this.val;
    }

    @inline
    unwrapOr(def: T): T {
        if (this.isSome) {
            return this.val;
        }
        return def;
    }

    @inline
    unwrapOrElse(fn: RecoveryFn<T>): T {
        if (this.isSome) {
            return this.val;
        }
        return fn();
    }

    map<U>(fn: MapFn<T, U>): Option<U> {
        if (this.isNone) {
            return Option.None<U>();
        }
        return Option.Some(fn(this.val));
    }

    mapOr<U>(def: U, fn: MapFn<T, U>): U {
        if (this.isNone) {
            return def;
        }
        return fn(this.val);
    }

    mapOrElse<U>(defFn: RecoveryFn<U>, fn: MapFn<T, U>): U {
        if (this.isNone) {
            return defFn();
        }
        return fn(this.val);
    }

    flatMap<U>(fn: FlatMapFn<T, U>): Option<U> {
        if (this.isNone) {
            return Option.None<U>();
        }
        return fn(this.val) as Option<U>;
    }

    and<U>(val: Option<U>): Option<U> {
        if (this.isSome) {
            return val;
        }
        return Option.None<U>();
    }

    @inline
    andThen<U>(fn: FlatMapFn<T, U>): Option<U> {
        return this.flatMap<U>(fn);
    }

    or(def: Option<T>): Option<T> {
        if (this.isSome) {
            return Option.Some<T>(this.val);
        }
        return def;
    }

    orElse(defFn: () => Option<T>): Option<T> {
        if (this.isSome) {
            return Option.Some<T>(this.val);
        }
        return defFn();
    }

    @inline
    @operator("==")
    eq(other: Option<T>): bool {
        return this.val == other.val;
    }

    @inline
    @operator("!=")
    notEq(other: Option<T>): bool {
        return !this.eq(other);
    }
}

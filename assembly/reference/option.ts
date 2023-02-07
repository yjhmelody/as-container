import { Optionable } from "../optionable";
import { MapFn, RecoveryFn } from "../shared";

export type FlatMapFn<T, U> = MapFn<T, Option<U>>;

/**
 * Type Option represents an optional value: every Option is either Some and contains a value,
 * or None, and does not.
 *
 * The Option version can only wrap reference type, but it will save some bytes and reduce reference overhead.
 */
export class Option<T> implements Optionable<T> {
    constructor(protected _val: T | null = null) {}

    @inline
    static Some<T>(val: T): Option<T> {
        return new Option<T>(val);
    }

    @inline
    static None<T>(): Option<T> {
        return new Option<T>(null);
    }

    @inline
    get isSome(): bool {
        if (this._val) {
            return true;
        } else {
            return false;
        }
    }

    @inline
    get isNone(): bool {
        if (this._val) {
            return false;
        } else {
            return true;
        }
    }

    @inline
    clone(): this {
        return instantiate<this>(this._val);
    }

    @inline
    unwrap(): T {
        return this.expect("Option: Unwrap none");
    }

    @inline
    expect(msg: string): T {
        if (this.isNone) {
            assert(false, msg);
        }
        return this._val as T;
    }

    @inline
    unwrapOr(def: T): T {
        if (this.isSome) {
            return this._val as T;
        }
        return def;
    }

    @inline
    unwrapOrElse(fn: RecoveryFn<T>): T {
        if (this.isSome) {
            return this._val as T;
        }
        return fn();
    }

    map<U>(fn: MapFn<T, U>): Option<U> {
        if (this.isNone) {
            return Option.None<U>();
        }
        return Option.Some(fn(this._val as T));
    }

    mapOr<U>(def: U, fn: MapFn<T, U>): U {
        if (this.isNone) {
            return def;
        }
        return fn(this._val as T);
    }

    mapOrElse<U>(defFn: RecoveryFn<U>, fn: MapFn<T, U>): U {
        if (this.isNone) {
            return defFn();
        }
        return fn(this._val as T);
    }

    flatMap<U>(fn: FlatMapFn<T, U>): Option<U> {
        if (this.isNone) {
            return Option.None<U>();
        }
        return fn(this._val as T);
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
            return Option.Some<T>(this._val as T);
        }
        return def;
    }

    orElse(defFn: () => Option<T>): Option<T> {
        if (this._val !== null) {
            return Option.Some<T>(this._val as T);
        }
        return defFn();
    }

    @inline
    @operator("==")
    eq(other: this): bool {
        return this._val == other._val;
    }

    @inline
    @operator("!=")
    notEq(other: this): bool {
        return !this.eq(other);
    }
}

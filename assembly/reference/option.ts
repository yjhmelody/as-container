import { Optionable } from "../optionable";
import {  MapFn, RecoveryFn } from "../shared";

export type FlatMapFn<T, U> = MapFn<T, Option<U>>;

/**
 * Type Option represents an optional value: every Option is either Some and contains a value,
 * or None, and does not.
 *
 * The Option version can only wrap reference type, but it will save some bytes.
 */
export class Option<T> implements Optionable<T> {
    constructor(private readonly val: T | null = null) {}

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
        return this.val !== null;
    }

    @inline
    get isNone(): bool {
        return this.val === null;
    }

    @inline
    unwrap(): T {
        return this.expect("Option: Unwrap none");
    }

    @inline
    expect(msg: string): T {
        assert(this.val !== null, msg);
        return this.val as T;
    }

    @inline
    unwrapOr(def: T): T {
        if (this.val !== null) {
            return this.val as T;
        }
        return def;
    }

    @inline
    unwrapOrElse(fn: RecoveryFn<T>): T {
        if (this.val !== null) {
            return this.val as T;
        }
        return fn();
    }

    map<U>(fn: MapFn<T, U>): Option<U> {
        if (this.val === null) {
            return Option.None<U>();
        }
        return Option.Some(fn(this.val as T));
    }

    mapOr<U>(def: U, fn: MapFn<T, U>): U {
        if (this.val === null) {
            return def;
        }
        return fn(this.val as T);
    }

    mapOrElse<U>(defFn: RecoveryFn<U>, fn: MapFn<T, U>): U {
        if (this.val === null) {
            return defFn();
        }
        return fn(this.val as T);
    }

    flatMap<U>(fn: FlatMapFn<T, U>): Option<U> {
        if (this.val === null) {
            return Option.None<U>();
        }
        return fn(this.val as T);
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
        if (this.val !== null) {
            return Option.Some<T>(this.val as T);
        }
        return def;
    }

    orElse(defFn: () => Option<T>): Option<T> {
        if (this.val !== null) {
            return Option.Some<T>(this.val as T);
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

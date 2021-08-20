import { MapFn, RecoveryFn } from "../shared";
import { Optionable } from "../optionable";
import { instantiateZero } from "../util";

export type FlatMapFn<T, U> = MapFn<T, Option<U>>;

/**
 * Type Option represents an optional value: every Option is either Some and contains a value,
 * or None, and does not.
 *
 * The Option version can wrap both the primitive and reference type, but it will take up some more bytes and increase overhead.
 */
export class Option<T> implements Optionable<T> {
    // @ts-ignore
    @unsafe
    constructor(
        protected _val: T = instantiateZero<T>(),
        protected _isNone: bool = true
    ) {}

    @inline
    static Some<T>(val: T): Option<T> {
        return new Option<T>(val, false);
    }

    @inline
    static None<T>(): Option<T> {
        return new Option<T>();
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
    clone(): this {
        return instantiate<this>(this._val, this._isNone);
    }

    @inline
    unwrap(): T {
        return this.expect("Option: Unwrap None");
    }

    @inline
    expect(msg: string): T {
        assert(this.isSome, msg);
        return this._val;
    }

    @inline
    unwrapOr(def: T): T {
        if (this.isSome) {
            return this._val;
        }
        return def;
    }

    @inline
    unwrapOrElse(fn: RecoveryFn<T>): T {
        if (this.isSome) {
            return this._val;
        }
        return fn();
    }

    map<U>(fn: MapFn<T, U>): Option<U> {
        if (this.isNone) {
            return Option.None<U>();
        }
        return Option.Some(fn(this._val));
    }

    mapOr<U>(def: U, fn: MapFn<T, U>): U {
        if (this.isNone) {
            return def;
        }
        return fn(this._val);
    }

    mapOrElse<U>(defFn: RecoveryFn<U>, fn: MapFn<T, U>): U {
        if (this.isNone) {
            return defFn();
        }
        return fn(this._val);
    }

    flatMap<U>(fn: FlatMapFn<T, U>): Option<U> {
        if (this.isNone) {
            return Option.None<U>();
        }
        return fn(this._val) as Option<U>;
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
            return Option.Some<T>(this._val);
        }
        return def;
    }

    orElse(defFn: () => Option<T>): Option<T> {
        if (this.isSome) {
            return Option.Some<T>(this._val);
        }
        return defFn();
    }

    @inline
    @operator("==")
    eq(other: this): bool {
        if (this.isNone && other.isNone) {
            return true;
        } else if (this.isSome && other.isSome) {
            return this._val == other._val;
        } else {
            return false;
        }
    }

    @inline
    @operator("!=")
    notEq(other: this): bool {
        return !this.eq(other);
    }
}

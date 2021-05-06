import { MapFn, RecoveryFn } from "../shared";
import { instantiateZero } from "../util";
import { Optionable } from "../optionable";
import { Box } from "../box";

export type FlatMapFn<T, U> = MapFn<T, Option<U>>;

/**
 * Type Option represents an optional value: every Option is either Some and contains a value,
 * or None, and does not.
 *
 * The Option version can wrap the primitive and reference type, but it will take up some more bytes.
 */
export class Option<T> implements Optionable<T> {
    @inline
    constructor(
        protected readonly _val: Box<T> | null = null,
        protected _isNone: bool = true
    ) {}

    @inline
    static Some<T>(val: T): Option<T> {
        return new Option<T>(Box.from(val), false);
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
    unwrap(): T {
        return this.expect("Option: Unwrap None");
    }

    @inline
    expect(msg: string): T {
        assert(this.isSome, msg);
        return this._val!.unwrap();
    }

    @inline
    unwrapOr(def: T): T {
        if (this.isSome) {
            return this._val!.unwrap();
        }
        return def;
    }

    @inline
    unwrapOrElse(fn: RecoveryFn<T>): T {
        if (this.isSome) {
            return this._val!.unwrap();
        }
        return fn();
    }

    map<U>(fn: MapFn<T, U>): Option<U> {
        if (this.isNone) {
            return Option.None<U>();
        }
        return Option.Some(fn(this._val!.unwrap()));
    }

    mapOr<U>(def: U, fn: MapFn<T, U>): U {
        if (this.isNone) {
            return def;
        }
        return fn(this._val!.unwrap());
    }

    mapOrElse<U>(defFn: RecoveryFn<U>, fn: MapFn<T, U>): U {
        if (this.isNone) {
            return defFn();
        }
        return fn(this._val!.unwrap());
    }

    flatMap<U>(fn: FlatMapFn<T, U>): Option<U> {
        if (this.isNone) {
            return Option.None<U>();
        }
        return fn(this._val!.unwrap()) as Option<U>;
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
            return Option.Some<T>(this._val!.unwrap());
        }
        return def;
    }

    orElse(defFn: () => Option<T>): Option<T> {
        if (this.isSome) {
            return Option.Some<T>(this._val!.unwrap());
        }
        return defFn();
    }

    @inline
    @operator("==")
    eq(other: Option<T>): bool {
        if (this.isNone && other.isNone) {
            return true;
        } else if(this.isSome && other.isSome) {
            return this._val!.unwrap() == other._val!.unwrap();
        } else {
            return false;
        }
    }

    @inline
    @operator("!=")
    notEq(other: Option<T>): bool {
        return !this.eq(other);
    }
}

import { Option } from "./option";
import { instantiateZero } from "../util";
import { MapFn, RecoveryWithErrorFn } from "../shared";
import { Resultable } from "../resultable";

export type FlatMapOkFn<O, U, E> = MapFn<O, Result<U, E>>;
export type FlatMapErrFn<O, E, F> = MapFn<E, Result<O, F>>;

/**
 * Result<O, E> is the type used for returning and propagating errors.
 * It is an enum with the variants, Ok(T), representing success and containing a value,
 * and Err(E), representing error and containing an error value.
 *
 * The Result version can wrap the primitive and reference type, but it will take up some more bytes.
 */
export class Result<O, E> implements Resultable<O, E> {
    @inline
    private constructor(
        protected readonly _ok: O,
        protected readonly _err: E,
        protected _is_err: bool = false
    ) {}

    static Ok<O, E>(ok: O): Result<O, E> {
        return new Result<O, E>(ok, instantiateZero<E>());
    }

    static Err<O, E>(err: E): Result<O, E> {
        return new Result<O, E>(instantiateZero<O>(), err, true);
    }

    @inline
    get isOk(): bool {
        return !this._is_err;
    }

    @inline
    get isErr(): bool {
        return this._is_err;
    }

    ok(): Option<O> {
        if (this.isOk) {
            return Option.Some(this._ok);
        }
        return Option.None<O>();
    }

    err(): Option<E> {
        if (this.isErr) {
            return Option.Some(this._err);
        }
        return Option.None<E>();
    }

    map<U>(op: MapFn<O, U>): Result<U, E> {
        if (this.isOk) {
            return Result.Ok<U, E>(op(this._ok));
        }
        return Result.Err<U, E>(this._err);
    }

    mapOr<U>(def: U, fn: MapFn<O, U>): U {
        if (this.isOk) {
            return fn(this._ok);
        }
        return def;
    }

    mapOrElse<U>(defFn: RecoveryWithErrorFn<E, U>, fn: MapFn<O, U>): U {
        if (this.isOk) {
            return fn(this._ok);
        }
        return defFn(this._err);
    }

    mapErr<F>(op: MapFn<E, F>): Result<O, F> {
        if (this.isErr) {
            return Result.Err<O, F>(op(this._err));
        }
        return Result.Ok<O, F>(this._ok);
    }

    and<U>(res: Result<U, E>): Result<U, E> {
        if (this.isOk) {
            return res;
        }
        return Result.Err<U, E>(this._err as E);
    }

    andThen<U>(op: FlatMapOkFn<O, U, E>): Result<U, E> {
        if (this.isOk) {
            return op(this._ok);
        }
        return Result.Err<U, E>(this._err);
    }

    @inline
    flatMap<U>(op: FlatMapOkFn<O, U, E>): Result<U, E> {
        return this.andThen<U>(op);
    }

    or<F>(res: Result<O, F>): Result<O, F> {
        if (this.isErr) {
            return res;
        }
        return Result.Ok<O, F>(this._ok);
    }

    orElse<F>(op: FlatMapErrFn<O, E, F>): Result<O, F> {
        if (this.isErr) {
            return op(this._err);
        }
        return Result.Ok<O, F>(this._ok);
    }

    @inline
    unwrap(): O {
        return this.expect("Result: Unwrap ok");
    }

    @inline
    unwrapErr(): E {
        return this.expectErr("Result: Unwrap err");
    }

    @inline
    unwrapOr(optb: O): O {
        if (this.isOk) {
            return this._ok;
        }
        return optb;
    }

    unwrapOrElse(op: RecoveryWithErrorFn<E, O>): O {
        if (this.isOk) {
            return this._ok;
        }
        return op(this._err);
    }

    @inline
    expect(message: string): O {
        assert(this.isOk, message);
        return this._ok;
    }

    @inline
    expectErr(message: string): E {
        assert(this.isErr, message);
        return this._err;
    }

    @inline
    @operator("==")
    eq(other: Result<O, E>): bool {
        if (this.isOk && other.isOk) {
            return this._ok == other._ok;
        }
        if (this.isErr && other.isErr) {
            return this._err == other._err;
        }
        return false;
    }

    @inline
    @operator("!=")
    notEq(other: Result<O, E>): bool {
        return !this.eq(other);
    }
}


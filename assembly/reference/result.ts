import { Option } from "./option";
import { Resultable } from "../resultable";
import { MapFn, RecoveryWithErrorFn } from "../shared";

export type FlatMapOkFn<O, U, E> = MapFn<O, Result<U, E>>;
export type FlatMapErrFn<O, E, F> = MapFn<E, Result<O, F>>;

/**
 * Result<O, E> is the type used for returning and propagating errors.
 * It is an enum with the variants, Ok(T), representing success and containing a value,
 * and Err(E), representing error and containing an error value.
 *
 * The Result version can only wrap reference type, but it will reduce reference overhead.
 */
export class Result<O, E> implements Resultable<O, E> {
    private constructor(
        // _ok is null when _err is not null.
        protected readonly _ok: O | null,
        // _err is null when _ok is not null.
        protected readonly _err: E | null
    ) {}

    @inline
    static Ok<O, E>(ok: O): Result<O, E> {
        return new Result<O, E>(ok, null);
    }

    @inline
    static Err<O, E>(err: E): Result<O, E> {
        return new Result<O, E>(null, err);
    }

    @inline
    get isOk(): bool {
        return this._err === null;
    }

    @inline
    get isErr(): bool {
        return this._ok === null;
    }

    @inline
    clone(): Result<O, E> {
        return new Result<O, E>(this._ok, this._err);
    }

    ok(): Option<O> {
        if (this._ok !== null) {
            return Option.Some(this._ok as O);
        }
        return Option.None<O>();
    }

    err(): Option<E> {
        if (this._err !== null) {
            return Option.Some(this._err as E);
        }
        return Option.None<E>();
    }

    map<U>(op: MapFn<O, U>): Result<U, E> {
        if (this._ok !== null) {
            return Result.Ok<U, E>(op(this._ok as O));
        }
        return Result.Err<U, E>(this._err as E);
    }

    mapOr<U>(def: U, fn: MapFn<O, U>): U {
        if (this._ok !== null) {
            return fn(this._ok as O);
        }
        return def;
    }

    mapOrElse<U>(defFn: RecoveryWithErrorFn<E, U>, fn: MapFn<O, U>): U {
        if (this._ok !== null) {
            return fn(this._ok as O);
        }
        return defFn(this._err as E);
    }

    mapErr<F>(op: MapFn<E, F>): Result<O, F> {
        if (this._err !== null) {
            return Result.Err<O, F>(op(this._err as E));
        }
        return Result.Ok<O, F>(this._ok as O);
    }

    and<U>(res: Result<U, E>): Result<U, E> {
        if (this._ok !== null) {
            return res;
        }
        return Result.Err<U, E>(this._err as E);
    }

    andThen<U>(op: FlatMapOkFn<O, U, E>): Result<U, E> {
        if (this._ok !== null) {
            return op(this._ok as O);
        }
        return Result.Err<U, E>(this._err as E);
    }

    @inline
    flatMap<U>(op: FlatMapOkFn<O, U, E>): Result<U, E> {
        return this.andThen<U>(op);
    }

    or<F>(res: Result<O, F>): Result<O, F> {
        if (this._err !== null) {
            return res;
        }
        return Result.Ok<O, F>(this._ok as O);
    }

    orElse<F>(op: FlatMapErrFn<O, E, F>): Result<O, F> {
        if (this._err !== null) {
            return op(this._err as E);
        }
        return Result.Ok<O, F>(this._ok as O);
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
        if (this._ok !== null) {
            return this._ok as O;
        }
        return optb;
    }

    unwrapOrElse(op: RecoveryWithErrorFn<E, O>): O {
        if (this._ok !== null) {
            return this._ok as O;
        }
        return op(this._err as E);
    }

    @inline
    expect(message: string): O {
        assert(this._ok !== null, message);
        return this._ok as O;
    }

    @inline
    expectErr(message: string): E {
        assert(this._err !== null, message);
        return this._err as E;
    }

    @inline
    @operator("==")
    eq(other: Result<O, E>): bool {
        return this._ok == other._ok && this._err == other._err;
    }

    @inline
    @operator("!=")
    notEq(other: Result<O, E>): bool {
        if (this._ok !== null && other._ok !== null) {
            return this._ok != other._ok;
        }

        if (this._err !== null && other._err !== null) {
            return this._err != other._err;
        }

        return true;
    }
}

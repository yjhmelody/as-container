import { Option } from "./option";
import { MapFn } from "./shared";

export type FlatMapOkFn<O, U, E> = MapFn<O, Result<U, E>>;
export type FlatMapErrFn<O, E, F> = MapFn<E, Result<O, F>>;
export type RecoveryWithErrorFn<E, O> = (e: E) => O;

export interface Resultable<O, E> {
    /**
     *  Returns true if the result is `Ok`.
     */
    isOk: bool;

    /**
     *  Returns true if the result is `Err`.
     */
    isErr: bool;

    /**
     *  Converts from `Result<T, E>` to `Option<T>`.
     *  If the self is `Ok`, returns `Some<T>`.
     *  Otherwise, returns `None<T>`.
     */
    ok(): Option<O>;

    /**
     *  Converts from `Result<T, E>` to `Option<E>`.
     *  If the self is `Err`, returns `Some<E>`.
     *  Otherwise, returns `None<E>`.
     */
    err(): Option<E>;

    /**
     *  Maps a `Result<T, E>` to `Result<U, E>` by applying a function `mapFn<T, U>`
     *  to an contained `Ok` value, leaving an `Err` value untouched.
     *
     *  This function can be used to compose the results of two functions.
     */
    map<U>(op: MapFn<O, U>): Result<U, E>;

    /**
     *  Maps a `Result<T, E>` to `U` by applying a function to a contained `Ok` value,
     *  or a `fallback` function to a contained `Err` value.
     *  This function can be used to unpack a successful result while handling an error.
     */
    mapOrElse<U>(fallback: RecoveryWithErrorFn<E, U>, selector: MapFn<O, U>): U;

    /**
     *  Maps a `Result<T, E>` to `Result<T, F>` by applying a function `mapFn<E, F>`
     *  to an contained `Err` value, leaving an `Ok` value untouched.
     *
     *  This function can be used to pass through a successful result while handling an error.
     */
    mapErr<F>(op: MapFn<E, F>): Result<O, F>;

    /**
     *  Returns `res` if the result is `Ok`, otherwise returns the `Err` value of self.
     */
    and<U>(res: Result<U, E>): Result<U, E>;

    /**
     *  Calls `op` if the result is `Ok`, otherwise returns the `Err` value of self.
     *  This function can be used for control flow based on result values.
     */
    andThen<U>(op: FlatMapOkFn<O, U, E>): Result<U, E>;

    /**
     *  Returns `res` if the result is `Err`, otherwise returns the `Ok` value of self.
     */
    or<F>(res: Result<O, F>): Result<O, F>;

    /**
     *  Calls `op` if the result is `Err`, otherwise returns the `Ok` value of self.
     *  This function can be used for control flow based on result values.
     */
    orElse<F>(op: FlatMapErrFn<O, E, F>): Result<O, F>;

    /**
     *  Return the inner `T` of a `Ok(T)`. Panif if the self is a `Err`
     */
    unwrap(): O;

    /**
     *  Return the inner `E` of a `Err(E)`. Panic if the self is a `Ok`.
     */
    unwrapErr(): E;

    /**
     *  Unwraps a result, return the content of an `Ok`. Else it returns `optb`.
     */
    unwrapOr(optb: O): O;

    /**
     *  Unwraps a result, returns the content of an `Ok`.
     *  If the value is an `Err` then it calls `op` with its value.
     */
    unwrapOrElse(op: RecoveryWithErrorFn<E, O>): O;

    /**
     *  Return the inner `T` of a `Ok(T)`.
     * Panics if the value is an Err, with a panic message including the passed message, and the content of the Err.
     */
    expect(message: string): O;

    /**
     *  Return the inner `E` of a `Err(E)`.
     * Panics if the value is a Ok, with a panic message including the passed message, and the content of the Err.
     */
    expectErr(message: string): E;
}

export class Result<O, E> implements Resultable<O, E> {
    private constructor(
        // _ok is null when _err is not null.
        private readonly _ok: O | null,
        // _err is null when _ok is not null.
        private readonly _err: E | null
    ) {}
    static Ok<O, E>(ok: O): Result<O, E> {
        return new Result<O, E>(ok, null);
    }

    static Err<O, E>(err: E): Result<O, E> {
        return new Result<O, E>(null, err);
    }

    @inline
    get isOk(): bool {
        return this._err == null;
    }

    @inline
    get isErr(): bool {
        return this._ok == null;
    }

    ok(): Option<O> {
        if (this._ok != null) {
            return Option.Some(this._ok);
        }
        return Option.None();
    }

    err(): Option<E> {
        if (this._err != null) {
            return Option.Some(this._err);
        }
        return Option.None();
    }

    map<U>(op: MapFn<O, U>): Result<U, E> {
        if (this._ok != null) {
            return Result.Ok(op(this._ok));
        }
        return Result.Err(this._err as E);
    }

    mapOrElse<U>(
        fallback: RecoveryWithErrorFn<E, U>,
        selector: MapFn<O, U>
    ): U {
        if (this._ok != null) {
            return selector(this._ok);
        }
        return fallback(this._err as E);
    }

    mapErr<F>(op: MapFn<E, F>): Result<O, F> {
        if (this._err != null) {
            return Result.Err(op(this._err));
        }
        return Result.Ok(this._ok as O);
    }

    and<U>(res: Result<U, E>): Result<U, E> {
        if (this._ok != null) {
            return res;
        }
        return Result.Err(this._err as E);
    }

    andThen<U>(op: FlatMapOkFn<O, U, E>): Result<U, E> {
        if (this._ok != null) {
            return op(this._ok);
        }
        return Result.Err(this._err as E);
    }

    or<F>(res: Result<O, F>): Result<O, F> {
        if (this._err != null) {
            return res;
        }
        return Result.Ok(this._ok as O);
    }

    orElse<F>(op: FlatMapErrFn<O, E, F>): Result<O, F> {
        if (this._err != null) {
            return op(this._err);
        }
        return Result.Ok(this._ok as O);
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
        if (this._ok != null) {
            return this._ok;
        }
        return optb;
    }

    unwrapOrElse(op: RecoveryWithErrorFn<E, O>): O {
        if (this._ok != null) {
            return this._ok;
        }
        return op(this._err as E);
    }

    @inline
    expect(message: string): O {
        assert(this._ok != null, message);
        return this._ok as O;
    }

    @inline
    expectErr(message: string): E {
        assert(this._err != null, message);
        return this._err as E;
    }
}

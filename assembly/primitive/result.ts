import { Option } from "./option";
import { MapFn, RecoveryWithErrorFn } from "../shared";
import { Resultable } from "../resultable";
import { Box } from "../box";

export type FlatMapOkFn<O, U, E> = MapFn<O, Result<U, E>>;
export type FlatMapErrFn<O, E, F> = MapFn<E, Result<O, F>>;

/**
 * Result<O, E> is the type used for returning and propagating errors.
 * It is an enum with the variants, Ok(T), representing success and containing a value,
 * and Err(E), representing error and containing an error value.
 *
 * The Result version can wrap the primitive and reference type, but it will increase reference overhead
 */
export class Result<O, E> implements Resultable<O, E> {
    private constructor(
        protected readonly _ok: Box<O> | null,
        protected readonly _err: Box<E> | null
    ) {}

    @inline
    static Ok<O, E>(ok: O): Result<O, E> {
        return new Result<O, E>(Box.from<O>(ok), null);
    }

    @inline
    static Err<O, E>(err: E): Result<O, E> {
        return new Result<O, E>(null, Box.from<E>(err));
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
        if (this.isOk) {
            return Option.Some(this.unwrap());
        }
        return Option.None<O>();
    }

    err(): Option<E> {
        if (this.isErr) {
            return Option.Some(this.unwrapErr());
        }
        return Option.None<E>();
    }

    map<U>(op: MapFn<O, U>): Result<U, E> {
        if (this.isOk) {
            return Result.Ok<U, E>(op(this.unwrap()));
        }
        return Result.Err<U, E>(this.unwrapErr());
    }

    mapOr<U>(def: U, fn: MapFn<O, U>): U {
        if (this.isOk) {
            return fn(this.unwrap());
        }
        return def;
    }

    mapOrElse<U>(defFn: RecoveryWithErrorFn<E, U>, fn: MapFn<O, U>): U {
        if (this.isOk) {
            return fn(this.unwrap());
        }
        return defFn(this.unwrapErr());
    }

    mapErr<F>(op: MapFn<E, F>): Result<O, F> {
        if (this.isErr) {
            return Result.Err<O, F>(op(this.unwrapErr()));
        }
        return Result.Ok<O, F>(this.unwrap());
    }

    and<U>(res: Result<U, E>): Result<U, E> {
        if (this.isOk) {
            return res;
        }
        return Result.Err<U, E>(this.unwrapErr());
    }

    andThen<U>(op: FlatMapOkFn<O, U, E>): Result<U, E> {
        if (this.isOk) {
            return op(this.unwrap());
        }
        return Result.Err<U, E>(this.unwrapErr());
    }

    @inline
    flatMap<U>(op: FlatMapOkFn<O, U, E>): Result<U, E> {
        return this.andThen<U>(op);
    }

    or<F>(res: Result<O, F>): Result<O, F> {
        if (this.isErr) {
            return res;
        }
        return Result.Ok<O, F>(this.unwrap());
    }

    orElse<F>(op: FlatMapErrFn<O, E, F>): Result<O, F> {
        if (this.isErr) {
            return op(this.unwrapErr());
        }
        return Result.Ok<O, F>(this.unwrap());
    }

    @inline
    unwrap(): O {
        return this.expect("Result: Unwrap Ok");
    }

    @inline
    unwrapErr(): E {
        return this.expectErr("Result: Unwrap Err");
    }

    @inline
    unwrapOr(optb: O): O {
        if (this.isOk) {
            return this.unwrap();
        }
        return optb;
    }

    unwrapOrElse(op: RecoveryWithErrorFn<E, O>): O {
        if (this.isOk) {
            return this.unwrap();
        }
        return op(this.unwrapErr());
    }

    @inline
    expect(message: string): O {
        assert(this.isOk, message);
        return this._ok!.unwrap() as O;
    }

    @inline
    expectErr(message: string): E {
        assert(this.isErr, message);
        return this._err!.unwrap() as E;
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

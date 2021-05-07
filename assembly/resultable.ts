import { MapFn, RecoveryWithErrorFn } from "./shared";
import { Optionable } from "./optionable";

type FlatMapOkFn<O, U, E> = MapFn<O, Resultable<U, E>>;
type FlatMapErrFn<O, E, F> = MapFn<E, Resultable<O, F>>;

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
     * Return a shallow copy of Resultable<O, E>
     * @returns
     */
    clone(): this;
    /**
     *  Converts from `Result<T, E>` to `Option<T>`.
     *  If the self is `Ok`, returns `Some<T>`.
     *  Otherwise, returns `None<T>`.
     */
    ok(): Optionable<O>;

    /**
     *  Converts from `Result<T, E>` to `Option<E>`.
     *  If the self is `Err`, returns `Some<E>`.
     *  Otherwise, returns `None<E>`.
     */
    err(): Optionable<E>;

    /**
     *  Maps a `Result<T, E>` to `Result<U, E>` by applying a function `mapFn<T, U>`
     *  to an contained `Ok` value, leaving an `Err` value untouched.
     *
     *  This function can be used to compose the results of two functions.
     */
    map<U>(op: MapFn<O, U>): Resultable<U, E>;

    /**
     *  Applies a function to the contained value (if Ok), or returns the provided default (if Err).
     */
    mapOr<U>(def: U, fn: MapFn<O, U>): U;

    /**
     *  Maps a `Result<T, E>` to `U` by applying a function to a contained `Ok` value,
     *  or a `fallback` function to a contained `Err` value.
     *  This function can be used to unpack a successful result while handling an error.
     */
    mapOrElse<U>(defFn: RecoveryWithErrorFn<E, U>, fn: MapFn<O, U>): U;

    /**
     *  Maps a `Result<T, E>` to `Result<T, F>` by applying a function `mapFn<E, F>`
     *  to an contained `Err` value, leaving an `Ok` value untouched.
     *
     *  This function can be used to pass through a successful result while handling an error.
     */
    mapErr<F>(op: MapFn<E, F>): Resultable<O, F>;

    /**
     *  Returns `res` if the result is `Ok`, otherwise returns the `Err` value of self.
     */
    and<U>(res: Resultable<U, E>): Resultable<U, E>;

    /**
     *  Calls `op` if the result is `Ok`, otherwise returns the `Err` value of self.
     *  This function can be used for control flow based on result values.
     */
    andThen<U>(op: FlatMapOkFn<O, U, E>): Resultable<U, E>;

    /**
     *  Returns `res` if the result is `Err`, otherwise returns the `Ok` value of self.
     */
    or<F>(res: Resultable<O, F>): Resultable<O, F>;

    /**
     *  Calls `op` if the result is `Err`, otherwise returns the `Ok` value of self.
     *  This function can be used for control flow based on result values.
     */
    orElse<F>(op: FlatMapErrFn<O, E, F>): Resultable<O, F>;

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

    /**
     * return true if results are both Ok or Err and the value is equal by `==`.
     * @param other Option
     * @returns
     */
    eq(other: this): bool;

    /**
     * return true if results are different result types, or the value is not equal by `!=`.
     * @param other Option
     * @returns
     */
    notEq(other: this): bool;
}

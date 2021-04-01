import { Option } from "./option";
import { FlatMapFn, MapFn, RecoveryFn } from "./shared";

export interface Optionable<T> {
    /**
     *  Return whether the self is `Some<T>` or not.
     */
    readonly isSome: bool;

    /**
     *  Return whether the self is `None` or not.
     */
    readonly isNone: bool;

    /**
     *  Return the inner `T` of a `Some<T>`. Panic if the self is a `None`.
     */
    unwrap(): T;

    /**
     *  Return the contained value or a default value `def`.
     *
     *  @param  def
     *      The default value which is used if the self is a `None`.
     */
    unwrapOr(def: T): T;

    /**
     *  Return the contained value or compute it from a closure `fn`.
     *
     *  @param fn
     *      The function which produces a default value which is used if the self is a `None`.
     */
    unwrapOrElse(fn: RecoveryFn<T>): T;

    /**
     *  Return the inner `T` of a `Some<T>`. Panic with msg if the self is a `None`.
     *
     *  @param  msg
     *      The error message which is used if the self is a `None`.
     */
    expect(msg: string): T;

    /**
     *  Map an `Option<T>` to `Option<U>` by applying a function to the contained value.
     *
     *  @param  fn
     *      The function which is applied to the contained value and return the result
     *      if the self is a `Some<T>`.
     */
    map<U>(fn: MapFn<T, U>): Option<U>;

    /**
     *  Return `None` if the self is `None`,
     *  otherwise call `fn` with the wrapped value and return the result.
     *
     *  @param  fn
     *      The function which is applied to the contained value and return the result
     *      if the self is a `Some<T>`. This result will be flattened once.
     */
    flatMap<U>(fn: FlatMapFn<T, U>): Option<U>;

    /**
     *  Apply a function `fn` to the contained value or return a default `def`.
     *
     *  @param  def
     *      The default value which is used if the self is a `None`.
     *  @param  fn
     *      The function which is applied to the contained value and return the result
     *      if the self is a `Some<T>`.
     */
    mapOr<U>(def: U, fn: MapFn<T, U>): U;

    /**
     *  Apply a function `fn` to the contained value or produce a default result by `defFn`.
     *
     *  @param  defFn
     *      The function which produces a default value which is used if the self is a `None`.
     *  @param  fn
     *      The function which is applied to the contained value and return the result
     *      if the self is a `Some<T>`.
     */
    mapOrElse<U>(def: RecoveryFn<U>, fn: MapFn<T, U>): U;

    /**
     *  Return the passed value if the self is `Some<T>`,
     *  otherwise return `None`.
     *
     *  @param  val
     *      The value which is returned if the self is a `Some<T>`.
     */
    and<U>(val: Optionable<U>): Option<U>;

    /**
     *  The alias of `Option<T>.flatMap()`.
     *
     *  @param  fn
     */
    andThen<U>(fn: FlatMapFn<T, U>): Option<U>;

    /**
     *  Return the self if it contains a value, otherwise return `optb`.
     *
     *  @param  optb
     *      The default value which is used if the self is a `None`.
     */
    or(optb: Optionable<T>): Option<T>;

    /**
     *  Return the self if it contains a value,
     *  otherwise call `fn` and returns the result.
     *
     *  @param  defFn
     *      The function which produces a default value which is used if the self is a `None`.
     */
    orElse(defFn: () => Option<T>): Option<T>;

    /**
     * return true if options are both None, or the inner value is equal by `==`.
     * @param other Option
     * @returns
     */
    eq(other: Optionable<T>): bool;

    /**
     * return true if options are different option types, or the inner value is not equal by `!=`.
     * @param other Option
     * @returns
     */
    notEq(other: Optionable<T>): bool;
}

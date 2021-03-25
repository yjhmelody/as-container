import { MapFn, RecoveryFn } from "./shared";

export type FlatMapFn<T, U> = MapFn<T, Option<U>>;

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
}

export class Option<T> {
    private constructor(private readonly val: T | null) {}

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
        return this.val != null;
    }

    @inline
    get isNone(): bool {
        return this.val == null;
    }

    @inline
    unwrap(): T {
        return this.expect("Option: Unwrap none");
    }

    @inline
    expect(msg: string): T {
        assert(this.val != null, msg);
        return this.val as T;
    }

    @inline
    unwrapOr(def: T): T {
        if (this.val != null) {
            return this.val;
        }
        return def;
    }

    @inline
    unwrapOrElse(fn: RecoveryFn<T>): T {
        if (this.val != null) {
            return this.val;
        }
        return fn();
    }

    map<U>(fn: MapFn<T, U>): Option<U> {
        if (this.val == null) {
            return Option.None<U>();
        }
        return Option.Some(fn(this.val));
    }

    mapOr<U>(def: U, fn: MapFn<T, U>): U {
        if (this.val == null) {
            return def;
        }
        return fn(this.val);
    }

    mapOrElse<U>(defFn: RecoveryFn<U>, fn: MapFn<T, U>): U {
        if (this.val == null) {
            return defFn();
        }
        return fn(this.val);
    }

    flatMap<U>(fn: FlatMapFn<T, U>): Option<U> {
        if (this.val == null) {
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

    andThen<U>(fn: FlatMapFn<T, U>): Option<U> {
        return this.flatMap(fn);
    }

    or(def: Option<T>): Option<T> {
        if (this.val != null) {
            return Option.Some<T>(this.val);
        }
        return def;
    }

    orElse(defFn: () => Option<T>): Option<T> {
        if (this.val != null) {
            return Option.Some<T>(this.val);
        }
        return defFn();
    }

    // static cloned<T, B extends Boxable<T> = Box<T>>(opt: Option<B>): Option<T> {
    //     if (opt.isSome) {
    //         return Option.Some(opt.unwrap().unwrap());
    //     }
    //     return Option.None<T>();
    // }
}



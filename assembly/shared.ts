export type RecoveryFn<T> = () => T;
export type MapFn<T, U> = (v: T) => U;
export type RecoveryWithErrorFn<E, O> = (e: E) => O;

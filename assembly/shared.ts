export type Nullable<T> = T | null;
export type RecoveryFn<T> = () => T;
export type MapFn<T, U> = (v: T) => U;

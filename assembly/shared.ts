import { Option } from "./option";
import { Result } from "./result";

export type Nullable<T> = T | null;
export type RecoveryFn<T> = () => T;
export type MapFn<T, U> = (v: T) => U;
export type FlatMapFn<T, U> = MapFn<T, Option<U>>;
export type FlatMapOkFn<O, U, E> = MapFn<O, Result<U, E>>;
export type FlatMapErrFn<O, E, F> = MapFn<E, Result<O, F>>;
export type RecoveryWithErrorFn<E, O> = (e: E) => O;

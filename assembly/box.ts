export interface Boxable<T> {
    unwrap(): T;

    map<U>(fn: (arg: T) => U): Box<U>;
}

export class Box<T> implements Boxable<T> {
    constructor(private readonly val: T) {}

    @inline
    static from<T>(val: T): Box<T> {
        return new Box(val);
    }

    @inline
    static new<T>(val: T): Box<T> {
        return new Box(val);
    }

    @inline
    unwrap(): T {
        return this.val;
    }

    @inline
    map<U>(fn: (arg: T) => U): Box<U> {
        return Box.from(fn(this.val));
    }

    @inline
    @operator("==")
    eq(other: Box<T> | null): bool {
        if (other === null) return false;
        return this.val == other.val;
    }

    @inline
    @operator("!=")
    notEq(other: Box<T> | null): bool {
        return !this.eq(other);
    }
}

/**
 * Box is used to wrap primitive type such u32 which cannot be null.
 * After boxing, the primitive type can be used like a reference type, and such as `T | null` syntax can be used.
 * All operators of box have been overloaded to box version
 */
export class Box<T> {
    constructor(private readonly val: T) {}

    /**
     * Create a Box version of value
     * @param val boxed value
     * @returns value of Box version
     */
    @inline
    static from<T>(val: T): Box<T> {
        return new Box(val);
    }

    /**
     * Alias for Box.from
     * @param val boxed value
     * @returns value of Box version
     */
    @inline
    static new<T>(val: T): Box<T> {
        return new Box(val);
    }

    /**
     * return the inner value of Box
     * @returns the inner value
     */
    @inline
    unwrap(): T {
        return this.val;
    }

    /**
     * Map a box to a new box
     * @param fn a map function to do operate on inner value and return a new box
     * @returns a new box created from the return value of function
     */
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
        if (other === null) return false;
        return this.val != other.val;
    }

    @inline
    @operator(">")
    gt(other: Box<T>): bool {
        return this.val > other.val;
    }

    @inline
    @operator(">=")
    ge(other: Box<T>): bool {
        return this.val >= other.val;
    }

    @inline
    @operator("<")
    lt(other: Box<T>): bool {
        return this.val < other.val;
    }

    @inline
    @operator("<=")
    le(other: Box<T>): bool {
        return this.val <= other.val;
    }

    @inline
    @operator(">>")
    arithmeticRightShift(other: Box<T>): Box<T> {
        return Box.from<T>(this.val >> other.val);
    }

    @inline
    @operator(">>>")
    logicalRightShift(other: Box<T>): Box<T> {
        return Box.from<T>(this.val >>> other.val);
    }

    @inline
    @operator("<<")
    leftShift(other: Box<T>): Box<T> {
        return Box.from<T>(this.val << other.val);
    }

    @inline
    @operator("&")
    and(other: Box<T>): Box<T> {
        return Box.from<T>(this.val & other.val);
    }

    @inline
    @operator("|")
    or(other: Box<T>): Box<T> {
        return Box.from<T>(this.val | other.val);
    }

    @inline
    @operator("^")
    xor(other: Box<T>): Box<T> {
        return Box.from<T>(this.val ^ other.val);
    }

    @inline
    @operator("+")
    add(other: Box<T>): Box<T> {
        return Box.from<T>(this.val + other.val);
    }

    @inline
    @operator("-")
    sub(other: Box<T>): Box<T> {
        return Box.from<T>(this.val - other.val);
    }

    @inline
    @operator("*")
    multi(other: Box<T>): Box<T> {
        return Box.from<T>(this.val * other.val);
    }

    @inline
    @operator("/")
    divide(other: Box<T>): Box<T> {
        return Box.from<T>(this.val / other.val);
    }

    @inline
    @operator("**")
    exp(other: Box<T>): Box<T> {
        return Box.from<T>(this.val ** other.val);
    }

    @inline
    @operator("%")
    remainder(other: Box<T>): Box<T> {
        return Box.from<T>(this.val % other.val);
    }

    @inline
    @operator.prefix("!")
    not(): bool {
        return !this.val;
    }

    @inline
    @operator.prefix("~")
    bitNot(): Box<T> {
        return Box.from<T>(~this.val);
    }

    @inline
    @operator.prefix("+")
    plus(): Box<T> {
        return Box.from<T>(+this.val);
    }

    @inline
    @operator.prefix("-")
    negate(): Box<T> {
        return Box.from<T>(-this.val);
    }
}

/**
 * Box is used to wrap primitive type such u32 which cannot be null. AS do not support a reference version of primitive type.
 * Note: Although Box can also wrap other reference types, it is of little significance.
 * After boxing, the primitive type can be used like a reference type, and such as `T | null` syntax can be used.
 * All operators of box have been overloaded to box version.
 * Note: Please use overloaded operators instead of corresponding methods, because method names are not stable yet.
 */
export class Box<T> {
    constructor(protected _val: T) {}

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
     * Return a shallow copy of box
     * @returns a new box
     */
    @inline
    clone(): Box<T> {
        return new Box<T>(this._val);
    }

    /**
     * Return the inner value of Box
     * @returns the inner value
     */
    @inline
    unwrap(): T {
        return this._val;
    }

    /**
     * Map a box to a new box
     * @param fn a map function to do operate on inner value and return a new box
     * @returns a new box created from the return value of function
     */
    @inline
    map<U>(fn: (arg: T) => U): Box<U> {
        return Box.from(fn(this._val));
    }

    /** The followings are operators overload **/

    @inline
    @operator("==")
    eq(other: this | null): bool {
        if (other === null) return false;
        return this._val == other._val;
    }

    @inline
    @operator("!=")
    notEq(other: this | null): bool {
        if (other === null) return false;
        return this._val != other._val;
    }

    @inline
    @operator(">")
    gt(other: this): bool {
        return this._val > other._val;
    }

    @inline
    @operator(">=")
    ge(other: this): bool {
        return this._val >= other._val;
    }

    @inline
    @operator("<")
    lt(other: this): bool {
        return this._val < other._val;
    }

    @inline
    @operator("<=")
    le(other: this): bool {
        return this._val <= other._val;
    }

    @inline
    @operator(">>")
    shr(other: this): this {
        return Box.from<T>(this._val >> other._val);
    }

    @inline
    @operator(">>>")
    shr_u(other: this): this {
        return Box.from<T>(this._val >>> other._val);
    }

    @inline
    @operator("<<")
    shl(other: this): this {
        return Box.from<T>(this._val << other._val);
    }

    @inline
    @operator("&")
    and(other: this): this {
        return Box.from<T>(this._val & other._val);
    }

    @inline
    @operator("|")
    or(other: this): this {
        return Box.from<T>(this._val | other._val);
    }

    @inline
    @operator("^")
    xor(other: this): this {
        return Box.from<T>(this._val ^ other._val);
    }

    @inline
    @operator("+")
    add(other: this): this {
        return Box.from<T>(this._val + other._val);
    }

    @inline
    @operator("-")
    sub(other: this): this {
        return Box.from<T>(this._val - other._val);
    }

    @inline
    @operator("*")
    mul(other: this): this {
        return Box.from<T>(this._val * other._val);
    }

    @inline
    @operator("/")
    div(other: this): this {
        return Box.from<T>(this._val / other._val);
    }

    @inline
    @operator("**")
    pow(other: this): this {
        return Box.from<T>(this._val ** other._val);
    }

    @inline
    @operator("%")
    rem(other: this): this {
        return Box.from<T>(this._val % other._val);
    }

    @inline
    @operator.prefix("!")
    isEmpty(): bool {
        return !this._val;
    }

    @inline
    @operator.prefix("~")
    not(): this {
        return Box.from<T>(~this._val);
    }

    @inline
    @operator.prefix("+")
    pos(): this {
        return Box.from<T>(+this._val);
    }

    @inline
    @operator.prefix("-")
    neg(): this {
        return Box.from<T>(-this._val);
    }

    @operator.prefix("++")
    preInc(): this {
        ++this._val;
        return this;
    }

    @operator.prefix("--")
    preDec(): this {
        --this._val;
        return this;
    }

    @operator.postfix("++")
    postInc(): this {
        return this.clone().preInc();
    }

    @operator.postfix("--")
    postDec(): this {
        return this.clone().preDec();
    }
}

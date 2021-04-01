export interface Boxable<T> {
    unwrap(): T;

    map<U>(fn: (arg: T) => U): Box<U>;
}

/**
 * Box is used to wrap primitive type such u32 which cannot be null.
 * All operators of box have been overloaded to box version
 */
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
    eq(other: Box<T> | null): Box<bool> {
        if (other === null) return False;
        return Box.from(this.val == other.val);
    }

    @inline
    @operator("!=")
    notEq(other: Box<T> | null): Box<bool> {
        if (other === null) return False;
        return Box.from(this.val != other.val);
    }

    @inline
    @operator(">")
    gt(other: Box<T>): Box<bool> {
        return Box.from(this.val > other.val);
    }

    @inline
    @operator(">=")
    ge(other: Box<T>): Box<bool> {
        return Box.from(this.val >= other.val);
    }

    @inline
    @operator("<")
    lt(other: Box<T>): Box<bool> {
        return Box.from(this.val < other.val);
    }

    @inline
    @operator("<=")
    le(other: Box<T>): Box<bool> {
        return Box.from(this.val <= other.val);
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
    not(): Box<bool> {
        return Box.from(!this.val);
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

export const True = new Box<bool>(true);
export const False = new Box<bool>(false);

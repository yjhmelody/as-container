import { Box } from "../box";

class A {
    @operator("==")
    eqA(_other: this | null): bool {
        return true;
    }
}
class B extends A {
    @operator("==")
    eqB(_other: this | null): bool {
        return false;
    }
}

class Person {}

describe("Box", () => {
    it("from, new", () => {
        const box = Box.from<i32>(1);
        const box2 = Box.new<i32>(1);
        expect(box).toBe(box2);
    });

    it("clone", () => {
        let b1 = Box.from(1);
        const b2 = b1.clone();
        expect(b1 == b2).toBe(true);
        // @ts-ignore
        b1++;
        expect(b1 == b2).toBe(false);
    });

    it("unwrap", () => {
        const box = Box.from("233");
        expect(box.unwrap()).toBe("233");
    });

    it("map", () => {
        const box = Box.from(1);
        expect(box.map<i32>((n) => n * 2).unwrap()).toBe(2);
    });

    it("eq", () => {
        const box = Box.from(1);
        const box2 = Box.from(1);
        expect(box == box2).toBe(true);
        expect(box.eq(box2)).toBe(true);

        const box3 = Box.from("box");
        const box4 = Box.from("box");
        expect(box3 == box4).toBe(true);

        const s = "box";
        const box5 = Box.from(s);
        const box6 = Box.from(s);
        expect(box5 == box6).toBe(true);

        const p1 = new Person();
        const p2 = new Person();

        expect(Box.from(p1) != Box.from(p2)).toBe(true);

        expect(changetype<B>(new A()) == new B()).toBe(false);
        expect(new B() == new B()).toBe(false);
        // eqA
        expect(Box.from(new A()) == Box.from(new A())).toBe(true);
        // eqA
        expect(Box.from<A>(new A()) == Box.from<A>(new B())).toBe(true);
        // eqB
        expect(Box.from<B>(new B()) == Box.from(new B())).toBe(false);
        // eqA
        expect(Box.from<A>(new B()) == Box.from<A>(new B())).toBe(true);
    });

    it("notEq", () => {
        const box = Box.from(1);
        const box2 = Box.from(2);
        expect(box != box2).toBe(true);
        expect(box.notEq(box2)).toBe(true);

        const box3 = Box.from<String>("box");
        const box4 = Box.from<String>("box");
        expect(box3 != box4).toBe(false);

        const s = "box";
        const box5 = Box.from(s);
        const box6 = Box.from(s);
        expect(box5 != box6).toBe(false);

        const p1 = new Person();
        const p2 = new Person();

        expect(Box.from(p1) != Box.from(p2)).toBe(true);
    });

    it("Box<i64>", () => {
        let box = Box.from<i64>(2);
        let box2 = Box.from<i64>(1);
        let box3 = Box.from<i64>(0);
        let box4 = Box.from<i64>(-1);

        expect(box == box2).toBe(false);
        expect(box != box2).toBe(true);

        expect(box > box2).toBe(true);
        expect(box >= box2).toBe(true);
        expect(box < box2).toBe(false);
        expect(box <= box2).toBe(false);

        // @ts-ignore
        expect(box >> box2).toBe(Box.from<i64>(1));
        // @ts-ignore
        expect(box >>> box2).toBe(Box.from<i64>(1));
        // @ts-ignore
        expect(box << box2).toBe(Box.from<i64>(4));
        // @ts-ignore
        expect(box & box2).toBe(Box.from<i64>(0));
        // @ts-ignore
        expect(box | box2).toBe(Box.from<i64>(3));
        // @ts-ignore
        expect(box ^ box2).toBe(Box.from<i64>(3));

        // @ts-ignore
        expect(box + box2).toBe(Box.from<i64>(3));
        // @ts-ignore
        expect(box - box2).toBe(Box.from<i64>(1));
        // @ts-ignore
        expect(box * box2).toBe(Box.from<i64>(2));
        // @ts-ignore
        expect(box / box2).toBe(Box.from<i64>(2));
        // @ts-ignore
        expect(box ** box2).toBe(Box.from<i64>(2));
        // @ts-ignore
        expect(box % box2).toBe(Box.from<i64>(0));

        expect(!box).toBe(false);
        expect(!box3).toBe(true);
        // @ts-ignore
        expect(~box).toBe(Box.from<i64>(~2));
        // @ts-ignore
        expect(+box4).toBe(Box.from<i64>(-1));
        // @ts-ignore
        expect(-box4).toBe(Box.from<i64>(1));
        // @ts-ignore

        // @ts-ignore
        expect(box++).toBe(Box.from<i64>(2));
        expect(box).toBe(Box.from<i64>(3));
        // @ts-ignore
        expect(++box2).toBe(Box.from<i64>(2));
        // @ts-ignore
        expect(box3--).toBe(Box.from<i64>(0));
        expect(box3).toBe(Box.from<i64>(-1));
        // @ts-ignore
        expect(--box4).toBe(Box.from<i64>(-2));
    });

    it("Box<i32>", () => {
        let box = Box.from<i32>(2);
        let box2 = Box.from<i32>(1);
        let box3 = Box.from<i32>(0);
        let box4 = Box.from<i32>(-1);

        expect(box == box2).toBe(false);
        expect(box != box2).toBe(true);

        expect(box > box2).toBe(true);
        expect(box >= box2).toBe(true);
        expect(box < box2).toBe(false);
        expect(box <= box2).toBe(false);

        // @ts-ignore
        expect(box >> box2).toBe(Box.from(1));
        // @ts-ignore
        expect(box >>> box2).toBe(Box.from(1));
        // @ts-ignore
        expect(box << box2).toBe(Box.from(4));
        // @ts-ignore
        expect(box & box2).toBe(Box.from(0));
        // @ts-ignore
        expect(box | box2).toBe(Box.from(3));
        // @ts-ignore
        expect(box ^ box2).toBe(Box.from(3));

        // @ts-ignore
        expect(box + box2).toBe(Box.from(3));
        // @ts-ignore
        expect(box - box2).toBe(Box.from(1));
        // @ts-ignore
        expect(box * box2).toBe(Box.from(2));
        // @ts-ignore
        expect(box / box2).toBe(Box.from(2));
        // @ts-ignore
        expect(box ** box2).toBe(Box.from(2));
        // @ts-ignore
        expect(box % box2).toBe(Box.from(0));

        expect(!box).toBe(false);
        expect(!box3).toBe(true);
        // @ts-ignore
        expect(~box).toBe(Box.from(~2));
        // @ts-ignore
        expect(+box4).toBe(Box.from(-1));
        // @ts-ignore
        expect(-box4).toBe(Box.from(1));

        // @ts-ignore
        expect(box++).toBe(Box.from(2));
        expect(box).toBe(Box.from(3));
        // @ts-ignore
        expect(++box2).toBe(Box.from(2));
        // @ts-ignore
        expect(box3--).toBe(Box.from(0));
        expect(box3).toBe(Box.from(-1));
        // @ts-ignore
        expect(--box4).toBe(Box.from(-2));
    });

    it("Box<i8>", () => {
        let box = Box.from<i8>(2);
        let box2 = Box.from<i8>(1);
        let box3 = Box.from<i8>(0);
        let box4 = Box.from<i8>(-1);

        expect(box == box2).toBe(false);
        expect(box != box2).toBe(true);

        expect(box > box2).toBe(true);
        expect(box >= box2).toBe(true);
        expect(box < box2).toBe(false);
        expect(box <= box2).toBe(false);

        // @ts-ignore
        expect(box >> box2).toBe(Box.from<i8>(1));
        // @ts-ignore
        expect(box >>> box2).toBe(Box.from<i8>(1));
        // @ts-ignore
        expect(box << box2).toBe(Box.from<i8>(4));
        // @ts-ignore
        expect(box & box2).toBe(Box.from<i8>(0));
        // @ts-ignore
        expect(box | box2).toBe(Box.from<i8>(3));
        // @ts-ignore
        expect(box ^ box2).toBe(Box.from<i8>(3));

        // @ts-ignore
        expect(box + box2).toBe(Box.from<i8>(3));
        // @ts-ignore
        expect(box - box2).toBe(Box.from<i8>(1));
        // @ts-ignore
        expect(box * box2).toBe(Box.from<i8>(2));
        // @ts-ignore
        expect(box / box2).toBe(Box.from<i8>(2));
        // @ts-ignore
        // @ts-ignore
        expect(box ** box2).toBe(Box.from<i8>(2));
        // @ts-ignore
        expect(box % box2).toBe(Box.from<i8>(0));

        expect(!box).toBe(false);
        expect(!box3).toBe(true);
        // @ts-ignore
        expect(~box).toBe(Box.from<i8>(~2));
        // @ts-ignore
        expect(+box4).toBe(Box.from<i8>(-1));
        // @ts-ignore
        expect(-box4).toBe(Box.from<i8>(1));

        // @ts-ignore
        expect(box++).toBe(Box.from<i8>(2));
        expect(box).toBe(Box.from<i8>(3));
        // @ts-ignore
        expect(++box2).toBe(Box.from<i8>(2));
        // @ts-ignore
        expect(box3--).toBe(Box.from<i8>(0));
        // @ts-ignore
        expect(box3).toBe(Box.from<i8>(-1));
        // @ts-ignore
        expect(--box4).toBe(Box.from<i8>(-2));
    });

    it("Box<u8>", () => {
        let box = Box.from<u8>(2);
        let box2 = Box.from<u8>(1);
        let box3 = Box.from<u8>(0);

        expect(box == box2).toBe(false);
        expect(box != box2).toBe(true);

        expect(box > box2).toBe(true);
        expect(box >= box2).toBe(true);
        expect(box < box2).toBe(false);
        expect(box <= box2).toBe(false);

        // @ts-ignore
        expect(box >> box2).toBe(Box.from<u8>(1));
        // @ts-ignore
        expect(box >>> box2).toBe(Box.from<u8>(1));
        // @ts-ignore
        expect(box << box2).toBe(Box.from<u8>(4));
        // @ts-ignore
        expect(box & box2).toBe(Box.from<u8>(0));
        // @ts-ignore
        expect(box | box2).toBe(Box.from<u8>(3));
        // @ts-ignore
        expect(box ^ box2).toBe(Box.from<u8>(3));

        // @ts-ignore
        expect(box + box2).toBe(Box.from<u8>(3));
        // @ts-ignore
        expect(box - box2).toBe(Box.from<u8>(1));
        // @ts-ignore
        expect(box * box2).toBe(Box.from<u8>(2));
        // @ts-ignore
        expect(box / box2).toBe(Box.from<u8>(2));
        // @ts-ignore
        expect(box ** box2).toBe(Box.from<u8>(2));
        // @ts-ignore
        expect(box % box2).toBe(Box.from<u8>(0));

        expect(!box).toBe(false);
        expect(!box3).toBe(true);
        // @ts-ignore
        expect(~box).toBe(Box.from<u8>(~2));

        // @ts-ignore
        expect(box++).toBe(Box.from<u8>(2));
        expect(box).toBe(Box.from<u8>(3));
        // @ts-ignore
        expect(++box2).toBe(Box.from<u8>(2));
        // @ts-ignore
        expect(box3--).toBe(Box.from<u8>(0));
        expect(box3).toBe(Box.from<u8>(255));
    });

    it("Box<string>", () => {
        const box = Box.from<String>("2");
        const box2 = Box.from<String>("1");

        expect(box == box2).toBe(false);
        expect(box != box2).toBe(true);

        expect(box > box2).toBe(true);
        expect(box >= box2).toBe(true);
        expect(box < box2).toBe(false);
        expect(box <= box2).toBe(false);

        // @ts-ignore
        expect(box + box2).toBe(Box.from("21"));
    });
});


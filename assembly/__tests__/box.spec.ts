import { Box } from "../box";

class A {
    @operator("==")
    eq(other: this): bool {
        return true;
    }
}
class B extends A {
    b(): void { }

    @operator("==")
    eq(other: this): bool {
        return super.eq(other) && false;
    }
}

describe("Box", () => {
    it("from, new", () => {
        const box = Box.from<i32>(1);
        const box2 = Box.new(1);
        expect(box).toStrictEqual(box2);
        expect(new A() == new B()).toBe(true);
        expect(new B() == new B()).toBe(false);
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
        expect(box.unwrap()).toStrictEqual("233");
    });

    it("map", () => {
        const box = Box.from(1);
        expect(box.map<i32>((n) => n * 2).unwrap()).toStrictEqual(2);
    });

    it("eq", () => {
        const box = Box.from(1);
        const box2 = Box.from(1);
        expect(box == box2).toStrictEqual(true);
        expect(box.eq(box2)).toStrictEqual(true);

        const box3 = Box.from("box");
        const box4 = Box.from("box");
        expect(box3 == box4).toStrictEqual(true);

        const s = "box";
        const box5 = Box.from(s);
        const box6 = Box.from(s);
        expect(box5 == box6).toStrictEqual(true);

        const p1 = new Person();
        const p2 = new Person();

        expect(Box.from(p1) != Box.from(p2)).toBe(true);
    });

    it("notEq", () => {
        const box = Box.from(1);
        const box2 = Box.from(2);
        expect(box != box2).toStrictEqual(true);
        expect(box.notEq(box2)).toStrictEqual(true);

        const box3 = Box.from("box");
        const box4 = Box.from("box");
        expect(box3 != box4).toStrictEqual(false);

        const s = "box";
        const box5 = Box.from(s);
        const box6 = Box.from(s);
        expect(box5 != box6).toStrictEqual(false);

        const p1 = new Person();
        const p2 = new Person();

        expect(Box.from(p1) != Box.from(p2)).toStrictEqual(true);
    });

    it("Box<i64>", () => {
        let box = Box.from<i64>(2);
        let box2 = Box.from<i64>(1);
        let box3 = Box.from<i64>(0);
        let box4 = Box.from<i64>(-1);

        expect(box == box2).toStrictEqual(false);
        expect(box != box2).toStrictEqual(true);

        expect(box > box2).toStrictEqual(true);
        expect(box >= box2).toStrictEqual(true);
        expect(box < box2).toStrictEqual(false);
        expect(box <= box2).toStrictEqual(false);

        // @ts-ignore
        expect(box >> box2).toStrictEqual(Box.from<i64>(1));
        // @ts-ignore
        expect(box >>> box2).toStrictEqual(Box.from<i64>(1));
        // @ts-ignore
        expect(box << box2).toStrictEqual(Box.from<i64>(4));
        // @ts-ignore
        expect(box & box2).toStrictEqual(Box.from<i64>(0));
        // @ts-ignore
        expect(box | box2).toStrictEqual(Box.from<i64>(3));
        // @ts-ignore
        expect(box ^ box2).toStrictEqual(Box.from<i64>(3));

        // @ts-ignore
        expect(box + box2).toStrictEqual(Box.from<i64>(3));
        // @ts-ignore
        expect(box - box2).toStrictEqual(Box.from<i64>(1));
        // @ts-ignore
        expect(box * box2).toStrictEqual(Box.from<i64>(2));
        // @ts-ignore
        expect(box / box2).toStrictEqual(Box.from<i64>(2));
        // @ts-ignore
        expect(box ** box2).toStrictEqual(Box.from<i64>(2));
        // @ts-ignore
        expect(box % box2).toStrictEqual(Box.from<i64>(0));

        expect(!box).toStrictEqual(false);
        expect(!box3).toStrictEqual(true);
        // @ts-ignore
        expect(~box).toStrictEqual(Box.from<i64>(~2));
        // @ts-ignore
        expect(+box4).toStrictEqual(Box.from<i64>(-1));
        // @ts-ignore
        expect(-box4).toStrictEqual(Box.from<i64>(1));
        // @ts-ignore

        // @ts-ignore
        expect(box++).toStrictEqual(Box.from<i64>(2));
        expect(box).toStrictEqual(Box.from<i64>(3));
        // @ts-ignore
        expect(++box2).toStrictEqual(Box.from<i64>(2));
        // @ts-ignore
        expect(box3--).toStrictEqual(Box.from<i64>(0));
        expect(box3).toStrictEqual(Box.from<i64>(-1));
        // @ts-ignore
        expect(--box4).toStrictEqual(Box.from<i64>(-2));
    });

    it("Box<i32>", () => {
        let box = Box.from(2);
        let box2 = Box.from(1);
        let box3 = Box.from(0);
        let box4 = Box.from(-1);

        expect(box == box2).toStrictEqual(false);
        expect(box != box2).toStrictEqual(true);

        expect(box > box2).toStrictEqual(true);
        expect(box >= box2).toStrictEqual(true);
        expect(box < box2).toStrictEqual(false);
        expect(box <= box2).toStrictEqual(false);

        // @ts-ignore
        expect(box >> box2).toStrictEqual(Box.from(1));
        // @ts-ignore
        expect(box >>> box2).toStrictEqual(Box.from(1));
        // @ts-ignore
        expect(box << box2).toStrictEqual(Box.from(4));
        // @ts-ignore
        expect(box & box2).toStrictEqual(Box.from(0));
        // @ts-ignore
        expect(box | box2).toStrictEqual(Box.from(3));
        // @ts-ignore
        expect(box ^ box2).toStrictEqual(Box.from(3));

        // @ts-ignore
        expect(box + box2).toStrictEqual(Box.from(3));
        // @ts-ignore
        expect(box - box2).toStrictEqual(Box.from(1));
        // @ts-ignore
        expect(box * box2).toStrictEqual(Box.from(2));
        // @ts-ignore
        expect(box / box2).toStrictEqual(Box.from(2));
        // @ts-ignore
        expect(box ** box2).toStrictEqual(Box.from(2));
        // @ts-ignore
        expect(box % box2).toStrictEqual(Box.from(0));

        expect(!box).toStrictEqual(false);
        expect(!box3).toStrictEqual(true);
        // @ts-ignore
        expect(~box).toStrictEqual(Box.from(~2));
        // @ts-ignore
        expect(+box4).toStrictEqual(Box.from(-1));
        // @ts-ignore
        expect(-box4).toStrictEqual(Box.from(1));

        // @ts-ignore
        expect(box++).toStrictEqual(Box.from(2));
        expect(box).toStrictEqual(Box.from(3));
        // @ts-ignore
        expect(++box2).toStrictEqual(Box.from(2));
        // @ts-ignore
        expect(box3--).toStrictEqual(Box.from(0));
        expect(box3).toStrictEqual(Box.from(-1));
        // @ts-ignore
        expect(--box4).toStrictEqual(Box.from(-2));
    });

    it("Box<i8>", () => {
        let box = Box.from<i8>(2);
        let box2 = Box.from<i8>(1);
        let box3 = Box.from<i8>(0);
        let box4 = Box.from<i8>(-1);

        expect(box == box2).toStrictEqual(false);
        expect(box != box2).toStrictEqual(true);

        expect(box > box2).toStrictEqual(true);
        expect(box >= box2).toStrictEqual(true);
        expect(box < box2).toStrictEqual(false);
        expect(box <= box2).toStrictEqual(false);

        // @ts-ignore
        expect(box >> box2).toStrictEqual(Box.from<i8>(1));
        // @ts-ignore
        expect(box >>> box2).toStrictEqual(Box.from<i8>(1));
        // @ts-ignore
        expect(box << box2).toStrictEqual(Box.from<i8>(4));
        // @ts-ignore
        expect(box & box2).toStrictEqual(Box.from<i8>(0));
        // @ts-ignore
        expect(box | box2).toStrictEqual(Box.from<i8>(3));
        // @ts-ignore
        expect(box ^ box2).toStrictEqual(Box.from<i8>(3));

        // @ts-ignore
        expect(box + box2).toStrictEqual(Box.from<i8>(3));
        // @ts-ignore
        expect(box - box2).toStrictEqual(Box.from<i8>(1));
        // @ts-ignore
        expect(box * box2).toStrictEqual(Box.from<i8>(2));
        // @ts-ignore
        expect(box / box2).toStrictEqual(Box.from<i8>(2));
        // @ts-ignore
        // @ts-ignore
        expect(box ** box2).toStrictEqual(Box.from<i8>(2));
        // @ts-ignore
        expect(box % box2).toStrictEqual(Box.from<i8>(0));

        expect(!box).toStrictEqual(false);
        expect(!box3).toStrictEqual(true);
        // @ts-ignore
        expect(~box).toStrictEqual(Box.from<i8>(~2));
        // @ts-ignore
        expect(+box4).toStrictEqual(Box.from<i8>(-1));
        // @ts-ignore
        expect(-box4).toStrictEqual(Box.from<i8>(1));

        // @ts-ignore
        expect(box++).toStrictEqual(Box.from<i8>(2));
        expect(box).toStrictEqual(Box.from<i8>(3));
        // @ts-ignore
        expect(++box2).toStrictEqual(Box.from<i8>(2));
        // @ts-ignore
        expect(box3--).toStrictEqual(Box.from<i8>(0));
        // @ts-ignore
        expect(box3).toStrictEqual(Box.from<i8>(-1));
        // @ts-ignore
        expect(--box4).toStrictEqual(Box.from<i8>(-2));
    });

    it("Box<u8>", () => {
        let box = Box.from<u8>(2);
        let box2 = Box.from<u8>(1);
        let box3 = Box.from<u8>(0);

        expect(box == box2).toStrictEqual(false);
        expect(box != box2).toStrictEqual(true);

        expect(box > box2).toStrictEqual(true);
        expect(box >= box2).toStrictEqual(true);
        expect(box < box2).toStrictEqual(false);
        expect(box <= box2).toStrictEqual(false);

        // @ts-ignore
        expect(box >> box2).toStrictEqual(Box.from<u8>(1));
        // @ts-ignore
        expect(box >>> box2).toStrictEqual(Box.from<u8>(1));
        // @ts-ignore
        expect(box << box2).toStrictEqual(Box.from<u8>(4));
        // @ts-ignore
        expect(box & box2).toStrictEqual(Box.from<u8>(0));
        // @ts-ignore
        expect(box | box2).toStrictEqual(Box.from<u8>(3));
        // @ts-ignore
        expect(box ^ box2).toStrictEqual(Box.from<u8>(3));

        // @ts-ignore
        expect(box + box2).toStrictEqual(Box.from<u8>(3));
        // @ts-ignore
        expect(box - box2).toStrictEqual(Box.from<u8>(1));
        // @ts-ignore
        expect(box * box2).toStrictEqual(Box.from<u8>(2));
        // @ts-ignore
        expect(box / box2).toStrictEqual(Box.from<u8>(2));
        // @ts-ignore
        expect(box ** box2).toStrictEqual(Box.from<u8>(2));
        // @ts-ignore
        expect(box % box2).toStrictEqual(Box.from<u8>(0));

        expect(!box).toStrictEqual(false);
        expect(!box3).toStrictEqual(true);
        // @ts-ignore
        expect(~box).toStrictEqual(Box.from<u8>(~2));

        // @ts-ignore
        expect(box++).toStrictEqual(Box.from<u8>(2));
        expect(box).toStrictEqual(Box.from<u8>(3));
        // @ts-ignore
        expect(++box2).toStrictEqual(Box.from<u8>(2));
        // @ts-ignore
        expect(box3--).toStrictEqual(Box.from<u8>(0));
        expect(box3).toStrictEqual(Box.from<u8>(255));
    });

    it("Box<string>", () => {
        const box = Box.from("2");
        const box2 = Box.from("1");

        expect(box == box2).toStrictEqual(false);
        expect(box != box2).toStrictEqual(true);

        expect(box > box2).toStrictEqual(true);
        expect(box >= box2).toStrictEqual(true);
        expect(box < box2).toStrictEqual(false);
        expect(box <= box2).toStrictEqual(false);

        // @ts-ignore
        expect(box + box2).toStrictEqual(Box.from("21"));
    });
});

class Person { }

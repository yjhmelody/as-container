import { Box } from "../box";

describe("Box", () => {
    it("from, new", () => {
        const box = Box.from<i32>(1);
        const box2 = Box.new(1);
        expect(box).toStrictEqual(box2);
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

        expect(box >> box2).toStrictEqual(Box.from(1));
        expect(box >>> box2).toStrictEqual(Box.from(1));
        expect(box << box2).toStrictEqual(Box.from(4));
        expect(box & box2).toStrictEqual(Box.from(0));
        expect(box | box2).toStrictEqual(Box.from(3));
        expect(box ^ box2).toStrictEqual(Box.from(3));

        expect(box + box2).toStrictEqual(Box.from(3));
        expect(box - box2).toStrictEqual(Box.from(1));
        expect(box * box2).toStrictEqual(Box.from(2));
        expect(box / box2).toStrictEqual(Box.from(2));
        expect(box ** box2).toStrictEqual(Box.from(2));
        expect(box % box2).toStrictEqual(Box.from(0));

        expect(!box).toStrictEqual(false);
        expect(!box3).toStrictEqual(true);
        expect(~box).toStrictEqual(Box.from(~2));
        expect(+box4).toStrictEqual(Box.from(-1));
        expect(-box4).toStrictEqual(Box.from(1));

        expect(box++).toStrictEqual(Box.from(2));
        expect(box).toStrictEqual(Box.from(3));
        expect(++box2).toStrictEqual(Box.from(2));
        expect(box3--).toStrictEqual(Box.from(0));
        expect(box3).toStrictEqual(Box.from(-1));
        expect(--box4).toStrictEqual(Box.from(-2));
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

        expect(box + box2).toStrictEqual(Box.from("21"));
    });
});

class Person {}

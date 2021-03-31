import { Box } from "../box";

describe("Box", () => {
    it("from, new", () => {
        const box = Box.from<i32>(1);
        const box2 = Box.new(1);
        expect(box).toStrictEqual(box2);
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

        expect(p1 == p2).toBe(false);
    });

    it("notEq", () => {
        const box = Box.from(1);
        const box2 = Box.from(2);
        expect(box != box2).toBe(true);
        expect(box.notEq(box2)).toBe(true);

        const box3 = Box.from("box");
        const box4 = Box.from("box");
        expect(box3 != box4).toBe(false);

        const s = "box";
        const box5 = Box.from(s);
        const box6 = Box.from(s);
        expect(box5 != box6).toBe(false);

        const p1 = new Person();
        const p2 = new Person();

        expect(p1 != p2).toBe(true);
    });
});

class Person {}

import { Box } from '../box';

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
});
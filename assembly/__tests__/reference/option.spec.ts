import { Option } from "../../reference";

describe("Option", () => {
    it("instantiate", () => {
        expect(instantiate<Option<string>>()).toBe(Option.None<string>());
    });

    it("isSome", () => {
        const x = Option.Some("233");
        expect(x.isSome).toBe(true);
    });

    it("isNone", () => {
        const x = Option.None<string>();
        expect(x.isNone).toBe(true);
    });

    it("unwrap, expect", () => {
        const x = Option.Some("233");
        expect(x.unwrap()).toBe("233");

        expect(() => {
            const x2 = Option.None<string>();
            x2.unwrap();
        }).toThrow();

        expect(() => {
            const x2 = Option.None<string>();
            x2.expect("panic");
        }).toThrow();
    });

    it("unwrapOr", () => {
        {
            const x = Option.Some("233");
            expect(x.unwrapOr("333")).toBe("233");
        }

        {
            const x = Option.None<string>();
            expect(x.unwrapOr("233")).toBe("233");
        }
    });

    it("unwrapOrElse", () => {
        {
            const x = Option.Some("233");
            expect(x.unwrapOrElse((): string => "333")).toBe("233");
        }

        {
            const x = Option.None<string>();
            expect(x.unwrapOrElse((): string => "233")).toBe("233");
        }
    });

    it("map", () => {
        const x = Option.Some("233");
        expect(x.map<string>((s) => s + s).unwrap()).toBe("233233");
    });

    it("mapOr", () => {
        const x = Option.Some("233");
        expect(x.mapOr<string>("233", (s: string) => s + s)).toBe("233233");

        const x2 = Option.None<string>();
        expect(x2.mapOr<string>("233", (s: string) => s + s)).toBe("233");
    });

    it("mapOrElse", () => {
        const x = Option.Some("233");
        expect(
            x.mapOrElse<string>(
                () => "233",
                (s: string) => s + s
            )
        ).toBe("233233");

        const x2 = Option.None<string>();
        expect(
            x2.mapOrElse<string>(
                () => "233",
                (s: string) => s + s
            )
        ).toBe("233");
    });

    it("flatMap, andThen", () => {
        const x = Option.Some("233");
        expect(
            x
                .andThen<string>((s) => Option.Some(s + s))
                .unwrap()
        ).toBe("233233");
        expect(
            x.andThen<string>((s) => Option.None<string>())
        ).toStrictEqual(Option.None<string>());
    });

    it("or", () => {
        const x = Option.Some("233");
        expect(x.or(Option.Some("333")).unwrap()).toBe("233");

        const x2 = Option.None<string>();
        expect(x2.or(Option.Some("233")).unwrap()).toBe("233");
    });

    it("and", () => {
        const x = Option.Some("some");
        expect(x.and(Option.Some<string>("and"))).toStrictEqual(
            Option.Some<string>("and")
        );
        expect(x.and(Option.None<string>())).toStrictEqual(
            Option.None<string>()
        );

        const x2 = Option.None<string>();
        expect(x2.and(Option.Some("some"))).toStrictEqual(
            Option.None<string>()
        );
        expect(x2.and(Option.None<string>())).toStrictEqual(
            Option.None<string>()
        );
    });

    it("orElse", () => {
        const x = Option.Some("233");
        expect(x.orElse(() => Option.Some("333")).unwrap()).toBe("233");

        const x2 = Option.None<string>();
        expect(x2.orElse(() => Option.Some("233")).unwrap()).toBe("233");
    });

    it("eq", () => {
        const x = Option.Some("some");
        const x2 = Option.Some("some");
        const x3 = Option.None<string>();
        const x4 = Option.None<string>();

        expect(x.eq(x2)).toBe(true);
        expect(x.eq(x3)).toBe(false);
        expect(x3.eq(x4)).toBe(true);

        expect(x == x2).toBe(true);
        expect(x == x3).toBe(false);
        expect(x3 == x4).toBe(true);
    });

    it("notEq", () => {
        const x = Option.Some("some");
        const x2 = Option.Some("some");
        const x3 = Option.None<string>();
        const x4 = Option.None<string>();

        expect(x.notEq(x2)).toBe(false);
        expect(x.notEq(x3)).toBe(true);
        expect(x3.notEq(x4)).toBe(false);

        expect(x != x2).toBe(false);
        expect(x != x3).toBe(true);
        expect(x3 != x4).toBe(false);
    });
});

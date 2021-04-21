import { Result } from "../../primitive/result";
import { Option } from "../../primitive/option";

class Foo {
    n: u32;
}

describe("Result", () => {
    it("isOk", () => {
        {
            const x = Result.Ok<string, string>("233");
            expect(x.isOk).toBe(true);
        }

        {
            const x = Result.Ok<i32, string>(1);
            expect(x.isOk).toBe(true);
        }

        {
            const x = Result.Err<i32, string>("233");
            expect(x.isOk).toBe(false);
        }
    });

    it("isErr", () => {
        const x = Result.Err<string, string>("233");
        expect(x.isErr).toBe(true);
    });

    it("unwrap, expect", () => {
        const x = Result.Ok<string, string>("233");
        expect(x.unwrap()).toBe("233");

        expect(() => {
            const x2 = Result.Err<Foo, string>("233");
            x2.unwrap();
        }).toThrow();

        expect(() => {
            const x2 = Result.Err<Foo, string>("233");
            x2.expect("panic");
        }).toThrow();
    });

    it("unwrapErr, expectErr", () => {
        const x = Result.Err<Foo, string>("233");
        expect(x.unwrapErr()).toBe("233");

        expect(() => {
            const x2 = Result.Ok<Foo, string>(instantiate<Foo>());
            x2.unwrapErr();
        }).toThrow();

        expect(() => {
            const x2 = Result.Ok<Foo, string>(instantiate<Foo>());
            x2.expectErr("panic");
        }).toThrow();
    });

    it("unwrapOr", () => {
        {
            const x = Result.Ok<string, string>("233");
            expect(x.unwrapOr("333")).toBe("233");
        }
    });

    it("unwrapOrElse", () => {
        {
            const x = Result.Ok<string, string>("ok");
            expect(x.unwrapOrElse((): string => "333")).toBe("ok");
        }

        {
            const x = Result.Err<string, string>("err");
            expect(x.unwrapOrElse((): string => "233")).toBe("233");
        }
    });

    it("map", () => {
        const x = Result.Ok<string, string>("233");
        expect(x.map<string>((s) => s + s).unwrap()).toBe("233233");
    });

    it("mapErr", () => {
        const x = Result.Err<string, string>("233");
        expect(x.mapErr<string>((s) => s + s).unwrapErr()).toBe("233233");
    });

    it("mapOr", () => {
        const x = Result.Ok<string, string>("ok");
        expect(x.mapOr<string>("ok2", (s: string) => s + s)).toBe("okok");

        const x2 = Result.Err<string, string>("err");
        expect(x2.mapOr<string>("err2", (s: string) => s + s)).toBe("err2");
    });

    it("mapOrElse", () => {
        const x = Result.Ok<string, string>("233");
        expect(
            x.mapOrElse<string>(
                () => "233",
                (s: string) => s + s
            )
        ).toBe("233233");
    });

    it("flatMap, andThen", () => {
        const x = Result.Ok<string, string>("ok");
        expect(
            x
                .andThen<string>((s) => Result.Ok<string, string>(s + s))
                .unwrap()
        ).toBe("okok");

        const x2 = Result.Err<string, string>("err");
        expect(
            x2.andThen<string>((s) => Result.Ok<string, string>(s + s))
        ).toStrictEqual(Result.Err<string, string>("err"));
    });

    it("or", () => {
        const x = Result.Ok<string, string>("ok");
        expect(x.or(Result.Ok<string, string>("or"))).toStrictEqual(
            Result.Ok<string, string>("ok")
        );

        const x2 = Result.Err<string, string>("err");
        expect(x2.or(Result.Ok<string, string>("ok"))).toStrictEqual(
            Result.Ok<string, string>("ok")
        );
    });

    it("and", () => {
        const x = Result.Ok<string, string>("ok");
        expect(x.and(Result.Ok<string, string>("ok2"))).toStrictEqual(
            Result.Ok<string, string>("ok2")
        );
        expect(x.and(Result.Err<string, string>("err"))).toStrictEqual(
            Result.Err<string, string>("err")
        );

        const x2 = Result.Err<string, string>("err");
        expect(x2.and(Result.Ok<string, string>("ok"))).toStrictEqual(
            Result.Err<string, string>("err")
        );
        expect(x2.and(Result.Err<string, string>("ok"))).toStrictEqual(
            Result.Err<string, string>("err")
        );
    });

    it("orElse", () => {
        const x = Result.Ok<string, string>("ok");
        expect(
            x.orElse<string>(() => Result.Ok<string, string>("ok"))
        ).toStrictEqual(Result.Ok<string, string>("ok"));

        const x2 = Result.Err<string, string>("err");
        expect(
            x2.orElse<string>(() => Result.Ok<string, string>("err2"))
        ).toStrictEqual(Result.Ok<string, string>("err2"));
    });

    it("ok, err", () => {
        const x = Result.Ok<string, string>("ok");
        expect(x.ok()).toStrictEqual(Option.Some("ok"));
        expect(x.err()).toStrictEqual(Option.None<string>());

        const x2 = Result.Err<string, string>("ok");
        expect(x2.err()).toStrictEqual(Option.Some("ok"));
        expect(x2.ok()).toStrictEqual(Option.None<string>());
    });

    it("eq", () => {
        const x = Result.Ok<string, string>("ok");
        const x2 = Result.Ok<string, string>("ok");
        const x3 = Result.Err<string, string>("err");
        const x4 = Result.Err<string, string>("err");

        expect(x.eq(x2)).toBe(true);
        expect(x.eq(x3)).toBe(false);
        expect(x3.eq(x4)).toBe(true);

        expect(x == x2).toBe(true);
        expect(x == x3).toBe(false);
        expect(x3 == x4).toBe(true);
    });

    it("notEq", () => {
        const x = Result.Ok<string, string>("ok");
        const x2 = Result.Ok<string, string>("ok");
        const x3 = Result.Err<string, string>("err");
        const x4 = Result.Err<string, string>("err");

        expect(x.notEq(x2)).toBe(false);
        expect(x.notEq(x3)).toBe(true);
        expect(x3.notEq(x4)).toBe(false);

        expect(x != x2).toBe(false);
        expect(x != x3).toBe(true);
        expect(x3 != x4).toBe(false);
    });
});

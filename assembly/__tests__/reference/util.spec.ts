import { Box } from "../../box";
import { Option, boxOption, optionCloned } from "../../reference";

describe("util", () => {
    it("boxOption", () => {
        expect(boxOption("box")).toBe(Box.from(Option.Some("box")));
        expect(boxOption<string>(null)).toBe(
            Box.from(Option.None<string>())
        );
    });

    it("optionCloned", () => {
        const x = Option.Some(Box.from("box"));

        expect(optionCloned<string>(x)).toBe(Option.Some("box"));
    });
});

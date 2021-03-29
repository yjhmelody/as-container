import { Box } from "../box";
import { boxOption, optionCloned } from "../util";
import { Option } from "../option";

describe("util", () => {
    it("boxOption", () => {
        expect(boxOption("box")).toStrictEqual(Box.from(Option.Some("box")));
        expect(boxOption<string>(null)).toStrictEqual(
            Box.from(Option.None<string>())
        );
    });

    it("optionCloned", () => {
        const x = Option.Some(Box.from("box"));

        expect(optionCloned<string>(x)).toStrictEqual(Option.Some("box"));
    });
});

import { parse } from "./parse";
import { Types } from "../parser-result/types";

test("parse", () => {
  const json = require("./../../assets/v3.0/petstore.json");
  const structure = parse(json)[0];

  expect(structure).toEqual(
    new Map([
      [
        "Pet",
        {
          type: Types.Object,
          properties: new Map([
            ["id", "number"],
            ["name", "string"],
            ["tag", "string"],
          ]),
        },
      ],
      [
        "Pets",
        {
          type: Types.Array,
          arg: "Pet",
        },
      ],
      [
        "Error",
        {
          type: Types.Object,
          properties: new Map([
            ["code", "number"],
            ["message", "string"],
          ]),
        },
      ],
    ])
  );
});

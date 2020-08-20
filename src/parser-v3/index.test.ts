import { parse } from "./parse";
import { TotalType, Types } from "../parser-result/types";

test("parse", () => {
  const json = require("./../../assets/v3.0/petstore.json");
  const structure = parse(json)[0];

  const expected: Map<string, TotalType> = new Map([
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
      "Petid",
      {
        type: Types.Number,
      },
    ],
    [
      "Petname",
      {
        type: Types.String,
      },
    ],
    [
      "Pettag",
      {
        type: Types.String,
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
    [
      "listPets",
      {
        type: Types.Function,
        args: new Map([
          [
            "limit",
            {
              type: "listPetslimitArgType",
            },
          ],
        ]),
        result: "listPetsResult",
      },
    ],
    [
      "listPetslimitArgType",
      {
        type: Types.Number,
      },
    ],
    [
      "listPetsResult",
      {
        type: Types.Promise,
        arg: "void",
      },
    ],
    [
      "Errorcode",
      {
        type: Types.Number,
      },
    ],
    [
      "Errormessage",
      {
        type: Types.String,
      },
    ],
    [
      "createPets",
      {
        type: Types.Function,
        args: new Map(),
        result: "createPetsResult",
      },
    ],
    [
      "createPetsResult",
      {
        type: Types.Promise,
        arg: "void",
      },
    ],
    [
      "showPetById",
      {
        type: Types.Function,
        args: new Map([["petId", { type: "showPetByIdpetIdArgType" }]]),
        result: "showPetByIdResult",
      },
    ],
    [
      "showPetByIdpetIdArgType",
      {
        type: Types.String,
      },
    ],
    [
      "showPetByIdResult",
      {
        type: Types.Promise,
        arg: "void",
      },
    ],
  ]);
  expect(structure).toEqual(expected);
});

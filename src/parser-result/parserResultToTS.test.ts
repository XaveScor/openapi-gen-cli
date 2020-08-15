import { GlobalTypes, Types } from "./types";
import { BufferedStringStream } from "../base-writer/BufferedStringStream";
import { parserResultToTS } from "./parserResultToTS";

const petStore: GlobalTypes = new Map([
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
]);

test("petstore", () => {
  const stream = new BufferedStringStream();
  parserResultToTS([petStore], stream);

  expect(stream.toString()).toBe(`interface Pet {
id: number;
name: string;
tag: string;
}
type Pets = ReadonlyArray<Pet>;
interface Error {
code: number;
message: string;
}
`);
});

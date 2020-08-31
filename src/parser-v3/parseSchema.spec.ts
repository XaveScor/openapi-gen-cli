import { parseSchemas } from "./parseSchemas";
import { StringFormat, TotalType, Types } from "../parser-result/types";
import { StringSchema } from "./OpenApiv3Schema";

describe("schema spec", () => {
  describe("string type", () => {
    test("empty format", () => {
      const schema = {
        variable: {
          type: "string",
        } as StringSchema,
      } as const;
      const res = new Map<string, TotalType>([
        [
          "variable",
          {
            type: Types.String,
            format: StringFormat.Equal,
          },
        ],
      ]);

      const parsed = parseSchemas("#", schema);
      expect(parsed).toEqual(res);
    });

    test("byte format", () => {
      const schema = {
        variable: {
          type: "string",
          format: "byte",
        } as StringSchema,
      } as const;
      const res = new Map<string, TotalType>([
        [
          "variable",
          {
            type: Types.String,
            format: StringFormat.Byte,
          },
        ],
      ]);

      const parsed = parseSchemas("#", schema);
      expect(parsed).toEqual(res);
    });

    test("binary format", () => {
      const schema = {
        variable: {
          type: "string",
          format: "binary",
        } as StringSchema,
      } as const;
      const res = new Map<string, TotalType>([
        [
          "variable",
          {
            type: Types.String,
            format: StringFormat.Binary,
          },
        ],
      ]);

      const parsed = parseSchemas("#", schema);
      expect(parsed).toEqual(res);
    });
  });
});

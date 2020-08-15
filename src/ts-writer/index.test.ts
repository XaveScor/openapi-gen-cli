import { BufferedStringStream } from "../base-writer/BufferedStringStream";
import { InterfaceWriter } from "./InterfaceWriter";
import { InterfaceFieldsWriter } from "./InterfaceFieldsWriter";
import { StringBaseType } from "./StringBaseType";
import { ArrayWriter } from "./ArrayWriter";

test("interface", () => {
  const stringStream = new BufferedStringStream();
  const source = new InterfaceWriter(
    "TestInterface",
    new InterfaceFieldsWriter(new Map([["field", () => new StringBaseType()]]))
  );
  source.write(stringStream);

  expect(stringStream.toString()).toBe(
    "interface TestInterface {\nfield: string;\n}\n"
  );
});

test("array", () => {
  const stringStream = new BufferedStringStream();
  const source = new ArrayWriter("TestArray", () => new StringBaseType());
  source.write(stringStream);

  expect(stringStream.toString()).toBe(
    "type TestArray = ReadonlyArray<string>;\n"
  );
});

test("array of custom type", () => {
  const stringStream = new BufferedStringStream();
  const customType = new InterfaceWriter("CustomType", new InterfaceFieldsWriter(new Map()));
  const source = new ArrayWriter("TestArray", () => customType);
  source.write(stringStream);

  expect(stringStream.toString()).toBe(
    "type TestArray = ReadonlyArray<CustomType>;\n"
  );
});

import { BufferedStringStream } from "../base-writer/BufferedStringStream";
import { InterfaceWriter } from "./InterfaceWriter";
import { InterfaceFieldsWriter } from "./InterfaceFieldsWriter";
import { StringBaseType } from "./StringBaseType";
import { ArrayWriter } from "./ArrayWriter";
import { NumberBaseType } from "./NumberBaseType";
import { FunctionWriter } from "./FunctionWriter";
import { FunctionArgsWriter } from "./FunctionArgsWriter";

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
  const customType = new InterfaceWriter(
    "CustomType",
    new InterfaceFieldsWriter(new Map())
  );
  const source = new ArrayWriter("TestArray", () => customType);
  source.write(stringStream);

  expect(stringStream.toString()).toBe(
    "type TestArray = ReadonlyArray<CustomType>;\n"
  );
});

test("array of numbers", () => {
  const stringStream = new BufferedStringStream();
  const source = new ArrayWriter("TestArray", () => new NumberBaseType());
  source.write(stringStream);

  expect(stringStream.toString()).toBe(
    "type TestArray = ReadonlyArray<number>;\n"
  );
});

test("function", () => {
  const stringStream = new BufferedStringStream();
  const source = new FunctionWriter(
    "testFunction",
    new FunctionArgsWriter(
      new Map([
        ["arg1", () => new StringBaseType()],
        ["arg2", () => new NumberBaseType()],
      ])
    ),
    () => new StringBaseType()
  );

  source.write(stringStream);
  expect(stringStream.toString()).toBe(
    "type testFunctionFunctionType = typeof testFunction;\nexport function testFunction(\narg1: string,\narg2: number,\n): string {}\n"
  );
});

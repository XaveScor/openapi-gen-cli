import { BufferedStringStream } from "./BufferedStringStream";
import { InterfaceWriter } from "./InterfaceWriter";
import { InterfaceFieldsWriter } from "./InterfaceFieldsWriter";
import { StringBaseType } from "./StringBaseType";

test("interface", () => {
  const stringStream = new BufferedStringStream();
  const source = new InterfaceWriter(
    "TestInterface",
    new InterfaceFieldsWriter(new Map([["field", new StringBaseType()]]))
  );
  source.write(stringStream);

  expect(stringStream.toString()).toBe(
    "interface TestInterface {\nfield: string;\n}\n"
  );
});

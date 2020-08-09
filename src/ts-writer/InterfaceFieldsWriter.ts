import { Writer } from "./Writer";
import { BufferedStream } from "./BufferedStream";
import { BaseType } from "./BaseType";

export class InterfaceFieldsWriter implements Writer {
  constructor(private readonly fields: Map<string, BaseType>) {}

  write(stream: BufferedStream): void {
    for (const line of this.fields.entries()) {
      const [fieldName, fieldType] = line;
      stream.write(`${fieldName}: ${fieldType.getTypeName()};`);
      stream.writeNewLine();
    }
  }
}

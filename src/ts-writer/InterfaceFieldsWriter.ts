import { Writer } from "../base-writer/Writer";
import { BufferedStream } from "../base-writer/BufferedStream";
import {LazyBaseType} from "../base-writer/LazyBaseType";

export class InterfaceFieldsWriter implements Writer {
  constructor(private readonly fields: Map<string, LazyBaseType>) {}

  write(stream: BufferedStream): void {
    for (const line of this.fields.entries()) {
      const [fieldName, fieldType] = line;
      stream.write(`${fieldName}: ${fieldType().getTypeName()};`);
      stream.writeNewLine();
    }
  }
}

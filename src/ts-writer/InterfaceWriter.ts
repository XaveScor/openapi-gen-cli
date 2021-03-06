import { Writer } from "../base-writer/Writer";
import { BufferedStream } from "../base-writer/BufferedStream";
import { BaseType } from "../base-writer/BaseType";
import { InterfaceFieldsWriter } from "./InterfaceFieldsWriter";

export class InterfaceWriter implements Writer, BaseType {
  constructor(private name: string, private fields: InterfaceFieldsWriter) {}

  write(stream: BufferedStream): void {
    stream.write(`interface ${this.name} {`);
    stream.writeNewLine();
    const fieldsStream = stream.getAppendedStream();
    this.fields.write(fieldsStream);
    stream.write(fieldsStream.toString());
    stream.write("}");
    stream.writeNewLine();
  }

  getTypeName(): string {
    return this.name;
  }
}

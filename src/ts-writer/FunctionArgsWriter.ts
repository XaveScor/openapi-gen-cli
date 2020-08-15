import { Writer } from "../base-writer/Writer";
import { BufferedStream } from "../base-writer/BufferedStream";
import { LazyBaseType } from "../base-writer/LazyBaseType";

export class FunctionArgsWriter implements Writer {
  constructor(private readonly fields: Map<string, LazyBaseType>) {}

  write(stream: BufferedStream): void {
    for (let [fieldName, field] of this.fields) {
      stream.write(`${fieldName}: ${field().getTypeName()},`);
      stream.writeNewLine();
    }
  }
}

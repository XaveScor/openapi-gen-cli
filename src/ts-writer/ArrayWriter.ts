import { Writer } from "./Writer";
import { BufferedStream } from "./BufferedStream";
import { BaseType } from "./BaseType";

export class ArrayWriter implements Writer, BaseType {
  constructor(private name: string, private arg: BaseType) {}

  write(stream: BufferedStream): void {
    stream.write(
      `type ${this.name} = ReadonlyArray<${this.arg.getTypeName()}>;`
    );
    stream.writeNewLine();
  }

  getTypeName(): string {
    return this.name;
  }
}

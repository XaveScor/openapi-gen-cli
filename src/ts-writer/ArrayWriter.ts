import { Writer } from "../base-writer/Writer";
import { BufferedStream } from "../base-writer/BufferedStream";
import { BaseType } from "../base-writer/BaseType";
import {LazyBaseType} from "../base-writer/LazyBaseType";

export class ArrayWriter implements Writer, BaseType {
  constructor(private name: string, private arg: LazyBaseType) {}

  write(stream: BufferedStream): void {
    stream.write(
      `type ${this.name} = ReadonlyArray<${this.arg().getTypeName()}>;`
    );
    stream.writeNewLine();
  }

  getTypeName(): string {
    return this.name;
  }
}

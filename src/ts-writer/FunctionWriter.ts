import { BaseType } from "../base-writer/BaseType";
import { Writer } from "../base-writer/Writer";
import { BufferedStream } from "../base-writer/BufferedStream";
import { LazyBaseType } from "../base-writer/LazyBaseType";
import { FunctionArgsWriter } from "./FunctionArgsWriter";

export class FunctionWriter implements BaseType, Writer {
  constructor(
    private readonly name: string,
    private readonly args: FunctionArgsWriter,
    private readonly returnType: LazyBaseType
  ) {}

  getTypeName(): string {
    return `${this.name}FunctionType`;
  }

  write(stream: BufferedStream): void {
    stream.write(`type ${this.getTypeName()} = typeof ${this.name};`);
    stream.writeNewLine();
    stream.write(`export function ${this.name}(`);
    stream.writeNewLine();
    const appendedStream = stream.getAppendedStream();
    this.args.write(appendedStream);
    stream.write(appendedStream.toString());
    stream.write(`): ${this.returnType().getTypeName()} {}`);
    stream.writeNewLine();
  }
}

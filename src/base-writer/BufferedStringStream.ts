import { BufferedStream } from "./BufferedStream";

export class BufferedStringStream implements BufferedStream {
  private chunks: Array<string> = [];

  constructor(private readonly indents = 0) {}
  write(chunk: string): void {
    this.chunks.push(chunk);
  }

  toString() {
    return this.chunks.join("");
  }

  getAppendedStream(): BufferedStream {
    return new BufferedStringStream(this.indents + 1);
  }

  writeNewLine(): void {
    this.chunks.push("\n");
  }
}

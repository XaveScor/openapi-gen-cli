export interface BufferedStream {
  write(chunk: string): void;
  writeNewLine(): void;
  getAppendedStream(): BufferedStream;
  toString(): string;
}

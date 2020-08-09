import {BufferedStream} from "./BufferedStream";

export interface Writer {
    write(stream: BufferedStream): void;
}

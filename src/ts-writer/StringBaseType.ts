import { BaseType } from "./BaseType";

export class StringBaseType implements BaseType {
  getTypeName(): string {
    return "string";
  }
}

import { BaseType } from "../base-writer/BaseType";

export class StringBaseType implements BaseType {
  getTypeName(): string {
    return "string";
  }
}

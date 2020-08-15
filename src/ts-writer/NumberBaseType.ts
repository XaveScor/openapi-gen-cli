import { BaseType } from "../base-writer/BaseType";

export class NumberBaseType implements BaseType {
  getTypeName(): string {
    return "number";
  }
}

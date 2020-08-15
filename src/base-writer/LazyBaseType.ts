import {BaseType} from "./BaseType";

export type LazyBaseType = () => BaseType;

export class LazyRegistry {
  private readonly map = new Map<string, BaseType>();

  set(name: string, value: BaseType) {
    this.map.set(name, value);
  }

  get(name): LazyBaseType {
    return () => {
      const res = this.map.get(name)
      if (res === undefined) {
        throw new Error()
      }

      return res;
    }
  }
}

export enum Types {
  Object,
  Array,
}

interface Object {
  type: Types.Object;
  properties: Map<string, GlobalTypeName>;
}

interface Array {
  type: Types.Array,
  arg: GlobalTypeName;
}

export type GlobalTypeName = string;

export type TotalType = Object | Array;

export type GlobalTypes = Map<GlobalTypeName, TotalType>;

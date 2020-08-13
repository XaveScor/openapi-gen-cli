export enum Types {
  Object,
  String,
  Number,
}

interface Object {
  type: Types.Object;
  properties: Map<string, GlobalTypeName>;
}

interface String {
  type: Types.String;
}

interface Number {
  type: Types.Number;
}

export type GlobalTypeName = string;

export type TotalType = Object | String | Number;

export type GlobalTypes = Map<GlobalTypeName, TotalType>;

export enum Types {
  Object,
  Array,
  Function,
  Promise,
  Number,
  String,
}

interface Object {
  type: Types.Object;
  properties: Map<string, GlobalTypeName>;
}

interface Array {
  type: Types.Array;
  arg: GlobalTypeName;
}

export interface FunctionType {
  type: Types.Function;
  args: Map<string, FunctionArg>;
  result: GlobalTypeName;
}

interface FunctionArg {
  type: GlobalTypeName;
}

export interface PromiseType {
  type: Types.Promise;
  arg: GlobalTypeName;
}

interface StringType {
  type: Types.String;
}

interface NumberType {
  type: Types.Number;
}

export type GlobalTypeName = string;

export type TotalType = Object | Array | FunctionType | PromiseType | StringType | NumberType;

export type GlobalTypes = Map<GlobalTypeName, TotalType>;

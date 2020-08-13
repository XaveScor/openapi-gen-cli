export interface Document {
  components: Components;
}

export type SchemaObject = {[arg: string]: Ref | Schema};

export interface Components {
  schemas: SchemaObject;
}

export interface Ref {
  $ref: string;
}

export interface ObjectSchema {
  type: "object";
  properties: SchemaObject;
}

export interface StringSchema {
  type: "string";
}

export interface IntegerSchema {
  type: "integer";
  format: "int32" | "int64";
}

export type Schema = ObjectSchema | StringSchema | IntegerSchema

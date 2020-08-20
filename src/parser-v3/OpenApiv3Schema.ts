export interface Document {
  components: Components;
  paths: Paths;
}

interface Paths {
  [path: string]: Path;
}

interface Path {
  get?: Operation;
  post?: Operation;
  put?: Operation;
  delete?: Operation;
  options?: Operation;
  head?: Operation;
  trace?: Operation;
}

export interface Operation {
  operationId: string;
  parameters?: ReadonlyArray<Parameters>;
  responses: Responses;
}

interface Parameters {
  name: string;
  in: "query" | "header" | "path" | "cookie";
  schema: Ref | Schema;
}
interface Responses {
  [code: string]: Response;
}

interface Response {
  content?: ResponseContent;
}

interface ResponseContent {
  [contentType: string]: {
    schema: Schema | Ref;
  };
}

export type SchemaObject = { [arg: string]: Ref | Schema };

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

export interface ArraySchema {
  type: "array";
  items: Ref;
}

export type Schema = ObjectSchema | StringSchema | IntegerSchema | ArraySchema;

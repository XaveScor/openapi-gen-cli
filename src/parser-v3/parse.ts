import { ParserResult } from "../parser-result/result";
import { Document } from "./OpenApiv3Schema";
import { parseSchemas } from "./parseSchemas";

function parseComponents(path: string, components: Document["components"]) {
  return parseSchemas(path + "/schemas", components.schemas);
}

export function parse(obj: unknown): ParserResult {
  const typedObj = obj as Document;

  return [parseComponents("#/components", typedObj.components)];
}

import { ParserResult } from "../parser-result/result";
import { Document } from "./OpenApiv3Schema";
import { parseSchemas } from "./parseSchemas";
import { parsePaths } from "./parsePaths";
import { mapAssign } from "../helpers/map";

function parseComponents(path: string, components: Document["components"]) {
  return parseSchemas(path + "/schemas", components.schemas);
}

export function parse(obj: unknown): ParserResult {
  const typedObj = obj as Document;

  const components = parseComponents("#/components", typedObj.components);
  const paths = parsePaths("#/paths", typedObj.paths);
  mapAssign(components, paths);
  return [components];
}

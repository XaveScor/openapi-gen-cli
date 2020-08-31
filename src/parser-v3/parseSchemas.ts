import { Document } from "./OpenApiv3Schema";
import { mapAssign, mapValues } from "../helpers/map";
import { StringFormat, TotalType, Types } from "../parser-result/types";

type RefPath = string;

enum DirtyType {
  Object,
  Array,
  Number,
  String,
}
interface DirtyObject {
  type: DirtyType.Object;
  name: string;
  properties: Map<string, RefPath>;
}
interface DirtyNumberType {
  name: string;
  type: DirtyType.Number;
}
interface DirtyStringType {
  name: string;
  type: DirtyType.String;
  format: StringFormat;
}
interface DirtyArray {
  type: DirtyType.Array;
  name: string;
  generic0: RefPath;
}

type TotalDirtyType =
  | DirtyObject
  | DirtyNumberType
  | DirtyStringType
  | DirtyArray;

interface ParseSchemasResult {
  pathLinks: Map<RefPath, RefPath>;
  components: Map<RefPath, TotalDirtyType>;
  entryPoints: Map<string, RefPath>;
}

function parseStringFormat(format?: "byte" | "binary"): StringFormat {
  switch (format) {
    case "byte":
      return StringFormat.Byte;
    case "binary":
      return StringFormat.Binary;
    case undefined:
    default:
      return StringFormat.Equal;
  }
}

function parseSchemasInternal(
  rootPath: string,
  schemas: Document["components"]["schemas"],
  namePrefix = ""
): ParseSchemasResult {
  const pathLinks = new Map<RefPath, RefPath>();
  const components = new Map<RefPath, TotalDirtyType>();
  const entryPoints = new Map<string, RefPath>();

  for (const [typeName, typeSchema] of Object.entries(schemas)) {
    const name = `${namePrefix}${typeName}`;
    const path = `${rootPath}/${typeName}`;
    entryPoints.set(typeName, path);
    if ("$ref" in typeSchema) {
      pathLinks.set(path, typeSchema.$ref);
      continue;
    }

    switch (typeSchema.type) {
      case "object":
        const propertiesData = parseSchemasInternal(
          path + "/properties",
          typeSchema.properties,
          name
        );

        components.set(path, {
          type: DirtyType.Object,
          name,
          properties: propertiesData.entryPoints,
        });
        mapAssign(pathLinks, propertiesData.pathLinks);
        mapAssign(components, propertiesData.components);
        break;
      case "string":
        components.set(path, {
          type: DirtyType.String,
          format: parseStringFormat(typeSchema.format),
          name,
        });
        break;
      case "integer":
        components.set(path, {
          type: DirtyType.Number,
          name,
        });
        break;
      case "array":
        components.set(path, {
          type: DirtyType.Array,
          name,
          generic0: typeSchema.items.$ref,
        });
        break;
    }
  }

  return { pathLinks, components, entryPoints };
}

function findComponent(
  name: RefPath,
  pathLinks: Map<RefPath, RefPath>,
  components: Map<RefPath, TotalDirtyType>
): string {
  let nextPath = name;
  let currentPath;
  do {
    currentPath = nextPath;
    nextPath = pathLinks.get(currentPath);
  } while (nextPath !== undefined);
  const component = components.get(currentPath);
  if (component === undefined) {
    throw new Error();
  }

  switch (component.type) {
    case DirtyType.Object:
      return component.name;
    case DirtyType.Number:
      return "number";
    case DirtyType.String:
      return "string";
    case DirtyType.Array:
      break;
  }
}

function normalize(
  pathLinks: Map<RefPath, RefPath>,
  components: Map<RefPath, TotalDirtyType>
): Map<string, TotalType> {
  const res = new Map<string, TotalType>();
  for (const component of components.values()) {
    switch (component.type) {
      case DirtyType.Object:
        res.set(component.name, {
          type: Types.Object,
          properties: mapValues(component.properties, (ref) =>
            findComponent(ref, pathLinks, components)
          ),
        });
        break;
      case DirtyType.Number:
        res.set(component.name, {
          type: Types.Number,
        });
        break;
      case DirtyType.String:
        res.set(component.name, {
          type: Types.String,
          format: component.format,
        });
        break;
      case DirtyType.Array:
        res.set(component.name, {
          type: Types.Array,
          arg: findComponent(component.generic0, pathLinks, components),
        });
        break;
    }
  }

  return res;
}

export function parseSchemas(
  rootPath: string,
  schemas: Document["components"]["schemas"]
): Map<string, TotalType> {
  const data = parseSchemasInternal(rootPath, schemas);

  return normalize(data.pathLinks, data.components);
}

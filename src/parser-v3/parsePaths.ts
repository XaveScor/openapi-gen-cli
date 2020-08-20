import { Document, Operation } from "./OpenApiv3Schema";
import { FunctionType, TotalType, Types } from "../parser-result/types";
import { parseSchemas } from "./parseSchemas";
import { mapAssign } from "../helpers/map";

function parseMethod(
  rootPath: string,
  name: keyof Document["paths"]["any"],
  method: Operation
): Map<string, TotalType> {
  const path = `${rootPath}/${name}`;
  const res = new Map<string, TotalType>();

  const args: FunctionType["args"] = new Map();
  if (Array.isArray(method.parameters)) {
    for (const parameter of method.parameters) {
      const argName = parameter.name;
      const schemaArgName = `${method.operationId}${argName}ArgType`;
      const schemaResult = parseSchemas(path, {
        [schemaArgName]: parameter.schema,
      });
      mapAssign(res, schemaResult);
      args.set(argName, {
        type: schemaArgName,
      });
    }
  }

  const resultType = `${method.operationId}Result`;
  res.set(resultType, {
    type: Types.Promise,
    arg: "void",
  });
  res.set(method.operationId, {
    type: Types.Function,
    result: resultType,
    args,
  });

  return res;
}

export function parsePaths(
  rootPath: string,
  paths: Document["paths"]
): Map<string, TotalType> {
  const res = new Map<string, TotalType>();
  const path = rootPath + "/paths";

  for (const [httpPath, pathValue] of Object.entries(paths)) {
    for (const [methodName, method] of Object.entries(pathValue)) {
      const methodResult = parseMethod(
        `${path}/${httpPath}`,
        methodName as any,
        method
      );
      mapAssign(res, methodResult);
    }
  }

  return res;
}

import { ParserResult } from "./result";
import { Writer } from "../base-writer/Writer";
import { BufferedStream } from "../base-writer/BufferedStream";
import { Types } from "./types";
import { InterfaceWriter } from "../ts-writer/InterfaceWriter";
import { InterfaceFieldsWriter } from "../ts-writer/InterfaceFieldsWriter";
import { ArrayWriter } from "../ts-writer/ArrayWriter";
import { LazyRegistry } from "../base-writer/LazyBaseType";
import { mapValues } from "../helpers/map";
import { StringBaseType } from "../ts-writer/StringBaseType";
import { NumberBaseType } from "../ts-writer/NumberBaseType";

function createLazyRegistry(): LazyRegistry {
  const registry = new LazyRegistry();

  registry.set("string", new StringBaseType());
  registry.set("number", new NumberBaseType());

  return registry;
}

export function parserResultToTS(
  parserResult: ParserResult,
  stream: BufferedStream
): void {
  const [globalTypes] = parserResult;

  const registry = createLazyRegistry();
  const writers: Array<Writer> = [];
  for (const [typeName, typeValue] of globalTypes) {
    switch (typeValue.type) {
      case Types.Object:
        const interfaceWriter = new InterfaceWriter(
          typeName,
          new InterfaceFieldsWriter(
            mapValues(typeValue.properties, registry.get)
          )
        );
        writers.push(interfaceWriter);
        registry.set(typeName, interfaceWriter);
        break;
      case Types.Array:
        const arrayWriter = new ArrayWriter(
          typeName,
          registry.get(typeValue.arg)
        );
        writers.push(arrayWriter);
        registry.set(typeName, arrayWriter);
        break;
    }
  }

  for (let writer of writers) {
    writer.write(stream);
  }
}

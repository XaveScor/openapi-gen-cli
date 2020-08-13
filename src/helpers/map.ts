export function mapValues<K, V, T>(map: Map<K, V>, mapper: (arg: V) => T): Map<K, T> {
  const res = new Map<K, T>()
  for (const [key, value] of map) {
    res.set(key, mapper(value))
  }

  return res;
}

export function mapAssign<K, V>(target: Map<K, V>, additional: Map<K, V>) {
  for (const [key, value] of additional) {
    target.set(key, value)
  }
}

export function toDeepObject(map: Map<string, unknown>) {
  const res = {};

  for (const [key, value] of map) {
    res[key] = value instanceof Map ? toDeepObject(value) : value
  }

  return res;
}

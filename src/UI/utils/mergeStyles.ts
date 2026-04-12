export function mergeStyles<T extends Record<string, any>>(
  base?: T,
  overrides?: T
) {
  return {
    ...(base || {}),
    ...(overrides || {}),
  } as T;
}

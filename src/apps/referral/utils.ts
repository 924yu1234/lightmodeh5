export function parseType(value: unknown): string {
  return `${value || ''}`.toLowerCase();
}

// UED project: GA events are no-op
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useGaEvent() {
  return (_event: string, _data?: any) => {};
}

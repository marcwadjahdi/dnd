export function deepCopy(o: any) {
  return JSON.parse(JSON.stringify(o));
}

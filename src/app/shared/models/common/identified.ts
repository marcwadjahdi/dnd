export interface Identified {
  id?: number;
}

export function randomId() {
  return Math.floor(Math.random() * Math.floor(999999999));
}

export enum Type {
  Player= "Player",
  NPC = "NPC",
  Enemy = "Enemy"
}

export interface HasType {
  type?: Type;
}

export namespace TypeArray {

  export function values() {
    return Object.keys(Type);
  }
}

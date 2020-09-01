export enum Type {
  Player= "Player",
  NPC = "NPC",
  Enemy = "Enemy"
}

export interface TypeCharacter {
  type?: Type;
}

export namespace TypeCharacterArray {

  export function values() {
    return Object.keys(Type);
  }
}

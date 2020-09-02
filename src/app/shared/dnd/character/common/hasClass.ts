export enum Class  {
  sorcerer = 'sorcerer',
  druid = 'druid',
  rogue = 'rogue',
  cleric = 'cleric'
}

export interface HasClass {
  class?: Class;
}

export namespace ClassArray {

  export function values() {
    return Object.keys(Class);
  }
}

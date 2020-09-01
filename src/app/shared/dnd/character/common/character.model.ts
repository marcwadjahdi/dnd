import {Attributes, HasAttributes, HasItems, HasLevel, Identified, Item, Named} from 'src/app/shared/dnd';
import {Type, TypeCharacter} from "./type";
import {HasHealth} from "./health";


export interface Character extends TypeCharacter, Identified, Named, HasLevel, HasAttributes, HasItems, HasHealth {
}

export class MyCharacter implements Character {
  name?: string;
  type?: Type;
  level?: number;
  attributes?: Attributes;
  items?: Array<Item>;
  actualHealth?: number;
  maxHealth?: number;

  constructor() {
  }
}

import { Injectable } from '@angular/core';
import {MyCharacter} from "../shared/dnd/character/common";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private listCharacter: MyCharacter[] = [];

  constructor() { }

  addCharacter(value: MyCharacter) {
    this.listCharacter.push(value);
  }

  deleteCharacter(value: MyCharacter) {
    this.listCharacter = this.listCharacter.filter(valueInlist => valueInlist.id != value.id);
  }

  getCharacter(id: number): MyCharacter {
    const tmpList = this.listCharacter.filter(valueInlist => valueInlist.id === id);
    return tmpList.length === 0 ? null : tmpList[0] ;
  }

  update(value: MyCharacter) {
    this.deleteCharacter(value);
    this.addCharacter(value);
  }

  getAllCharacter(): MyCharacter[] {
    return this.listCharacter;
  }
}

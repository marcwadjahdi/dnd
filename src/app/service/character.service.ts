import { Injectable } from '@angular/core';
import {Character} from '../shared/dnd/character/common';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private listCharacter: Character[] = [];

  constructor() { }

  addCharacter(value: Character) {
    this.listCharacter.push(value);
  }

  deleteCharacter(value: Character) {
    this.listCharacter = this.listCharacter.filter(valueInlist => valueInlist.id !== value.id);
  }

  getCharacter(id: number): Character {
    const tmpList = this.listCharacter.filter(valueInlist => valueInlist.id === id);
    return tmpList.length === 0 ? null : tmpList[0] ;
  }

  update(value: Character) {
    this.deleteCharacter(value);
    this.addCharacter(value);
  }

  getAllCharacter(): Character[] {
    return this.listCharacter;
  }
}

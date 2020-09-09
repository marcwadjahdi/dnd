import {Injectable} from '@angular/core';
import {Character} from './character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private characters: any = {};

  constructor() {
  }

  findAll(): Character[] {
    return Object.values(this.characters);
  }

  get(id: number): Character {
    const selected = this.characters[id];
    return selected ? {...selected} : null;
  }

  save(character: Character) {
    this.isValid(character);
    this.characters[character.id] = character;
  }

  deleteCharacter(character: Character) {
    this.isValid(character);
    delete this.characters[character.id];
  }

  isValid(character: Character) {
    if (!character.id) {
      throw new Error('Character has no idea');
    }
  }
}

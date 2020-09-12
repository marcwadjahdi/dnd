import {Injectable} from '@angular/core';
import {Character} from './character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private characters: {
    [id: number]: Character | undefined;
  } = {};

  constructor() {
  }

  findAll(): Character[] {
    return Object.values(this.characters);
  }

  search(predicate: (Character) => boolean): Character {
    return Object.values(this.characters).filter(predicate).shift();
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
    this.deleteById(character.id);
  }

  isValid(character: Character) {
    if (!character.id) {
      throw new Error('Character has no ID');
    }
  }

  deleteById(id: number) {
    delete this.characters[id];
  }

  deleteAll() {
    this.characters = {};
  }
}

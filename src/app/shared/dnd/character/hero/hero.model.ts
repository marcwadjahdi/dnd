import {CharacterType} from '../common/character-types';
import {HasLevel} from '../common/has-level';
import {Character} from '../common/character.model';

export interface Hero extends Character, HasLevel {
}

export function newHero(options): Hero {
  return {
    type: CharacterType.Player,
    hostile: false,
    ...options
  };
}

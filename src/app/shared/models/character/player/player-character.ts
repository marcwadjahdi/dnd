import {CharacterType} from '../common/character-types';
import {HasLevel} from './has-level';
import {Character} from '../common/character.model';

export interface PlayerCharacter extends Character, HasLevel {
}

export function newPlayer(options): PlayerCharacter {
  return {
    type: CharacterType.Player,
    hostile: false,
    ...options
  };
}

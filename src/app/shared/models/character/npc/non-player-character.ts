import {CharacterType} from '../common/character-types';
import {HasLevel} from '../player/has-level';
import {Character} from '../common/character.model';

export interface NonPlayerCharacter extends Character {
}

export function newNPC(options): NonPlayerCharacter {
  return {
    type: CharacterType.NPC,
    ...options
  };
}

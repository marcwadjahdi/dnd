import {Character} from './character.model';
import {CharacterType} from './enums/character-type.enum';
import {randomId} from '../common/identified';

export namespace Characters {
  export function isValid(character: Character) {
    const hasValidAttributes = character.attributes.strength && character.attributes.dexterity && character.attributes.constitution
      && character.attributes.intelligence && character.attributes.wisdom && character.attributes.charisma;

    const hasValidIdentity = character.name && character.maxHP;

    const hasValidSpecific = character.characterType === CharacterType.PC ? isValidPC(character) : isValidNPC(character);

    return hasValidIdentity && hasValidAttributes && hasValidSpecific;
  }

  function isValidPC(character: Character) {
    return character.characterClass && character.level && character.level >= 1 && character.level <= 20;
  }

  function isValidNPC(character: Character) {
    return !!character.cr;
  }

  export function saveCharacter(character: Character) {
    const id = character.id || randomId();
    const hp = character.hp || character.maxHP;
    return {id, hp, ...character};
  }
}

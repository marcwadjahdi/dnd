import {Character} from 'src/app/shared/models/character/character';
import {CharacterClasses} from 'src/app/shared/models/character/character-class';
import {randomId} from '../common/identified';
import {CharacterType} from './character-type';

function newPlayer(options): Character {
  return {
    characterType: CharacterType.PC,
    hostile: false,
    ...options
  };
}

export const pcs: Character[] = [
  newPlayer({
    id: randomId(),
    level: 4,
    characterClass: CharacterClasses.Rogue,
    name: 'Lokee',
    actualHealth: 29,
    maxHealth: 29,
    attributes: {
      strength: 10,
      dexterity: 19,
      constitution: 14,
      intelligence: 19,
      wisdom: 18,
      charisma: 1,
    }
  }),
  newPlayer({
    id: randomId(),
    level: 3,
    characterClass: CharacterClasses.Sorcerer,
    name: 'Zalkas Eärendil',
    actualHealth: 22,
    maxHealth: 22,
    attributes: {
      strength: 9,
      dexterity: 15,
      constitution: 14,
      intelligence: 14,
      wisdom: 12,
      charisma: 17,
    }
  }),
  newPlayer({
    id: randomId(),
    level: 3,
    characterClass: CharacterClasses.Druid,
    name: 'Nauthime Mario',
    actualHealth: 27,
    maxHealth: 27,
    attributes: {
      strength: 11,
      dexterity: 15,
      constitution: 16,
      intelligence: 12,
      wisdom: 17,
      charisma: 11,
    }
  }),
  newPlayer({
    id: randomId(),
    level: 3,
    characterClass: CharacterClasses.Cleric,
    name: 'Augustin',
    actualHealth: 24,
    maxHealth: 24,
    attributes: {
      strength: 11,
      dexterity: 12,
      constitution: 15,
      intelligence: 11,
      wisdom: 16,
      charisma: 12,
    }
  }),
];

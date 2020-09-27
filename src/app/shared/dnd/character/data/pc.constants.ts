import {Character} from 'src/app/shared/dnd/character/character.model';
import {CharacterClasses} from 'src/app/shared/dnd/character/enums/character-class.enum';
import {randomId} from '../../common/identified';
import {CharacterType} from '../enums/character-type.enum';
import {CharacterSize} from '../enums/character-size.enum';
import {CreatureType} from '../enums/creature-type.enum';

function newPlayer(options): Character {
  return {
    id: randomId(),
    characterType: CharacterType.PC,
    characterSize: CharacterSize.Medium,
    creatureType: CreatureType.Humanoid,
    hostile: false,
    ...options
  };
}

export const PlayersCharacters: Character[] = [
  newPlayer({
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

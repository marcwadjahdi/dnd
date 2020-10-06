import {Character} from 'src/app/shared/dnd/character/character.model';
import {CharacterClasses} from 'src/app/shared/dnd/character/enums/character-class.enum';
import {randomId} from '../../common/identified';
import {CharacterType} from '../enums/character-type.enum';
import {CharacterSizes} from '../enums/character-size.model';
import {CreatureType} from '../enums/creature-type.enum';

function newPlayer(options): Character {
  return {
    id: randomId(),
    characterType: CharacterType.PC,
    characterSize: CharacterSizes.Medium,
    creatureType: CreatureType.Humanoid,
    ...options
  };
}

export const PlayersCharacters: Character[] = [
  newPlayer({
    level: 4,
    characterClass: CharacterClasses.Rogue,
    name: 'Lokee',
    hp: 29,
    maxHP: 29,
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
    name: 'Zalkas',
    hp: 22,
    maxHP: 22,
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
    name: 'Nauthime',
    hp: 27,
    maxHP: 27,
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
    hp: 24,
    maxHP: 24,
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

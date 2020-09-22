import {CharacterType} from './character-types';

interface CharacterClass {
  type: CharacterType;
  name: string;
}

export interface HasClass {
  characterClass?: CharacterClass;
}

function toPlayerClass(name: string): CharacterClass {
  return {
    type: CharacterType.Player,
    name
  };
}

export const PlayerCharacterClasses = {
  Barbarian: toPlayerClass('Barbarian'),
  Bard: toPlayerClass('Bard'),
  Cleric: toPlayerClass('Cleric'),
  Druid: toPlayerClass('Druid'),
  Fighter: toPlayerClass('Fighter'),
  Monk: toPlayerClass('Monk'),
  Paladin: toPlayerClass('Paladin'),
  Ranger: toPlayerClass('Ranger'),
  Rogue: toPlayerClass('Rogue'),
  Sorcerer: toPlayerClass('Sorcerer'),
  Warlock: toPlayerClass('Warlock'),
  Wizard: toPlayerClass('Wizard'),
};

function toNpcClass(name: string): { [name: string]: CharacterClass } {
  return {
    [name]: {
      type: CharacterType.NPC,
      name
    }
  };
}

export const MonsterClasses = {
  ...toNpcClass('Goblin')
};

import {CharacterType} from './character-type';

export interface CharacterClass {
  type: CharacterType;
  name: string;
}

function toPlayerClass(name: string): CharacterClass {
  return {
    type: CharacterType.PC,
    name
  };
}

export const CharacterClasses = {
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

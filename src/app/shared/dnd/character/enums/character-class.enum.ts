import {CharacterType} from './character-type.enum';

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

function toNpcClass(name: string): CharacterClass {
  return {
    type: CharacterType.NPC,
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
  FriendlyNPC: toNpcClass('FriendlyNPC'),
  Neutral: toNpcClass('NeutralNPC'),
  HostileNPC: toNpcClass('HostileNPC'),
};

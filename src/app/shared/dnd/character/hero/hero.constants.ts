import {Hero, newHero} from './hero.model';
import {HeroClasses} from '../common/character-classes';
import {randomId} from '../../common/identified';

export const IrrandiaSHeroes: Hero[] = [
  newHero({
    id: randomId(),
    level: 4,
    characterClass: HeroClasses.Rogue,
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
  newHero({
    id: randomId(),
    level: 3,
    characterClass: HeroClasses.Sorcerer,
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
  newHero({
    id: randomId(),
    level: 3,
    characterClass: HeroClasses.Druid,
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
  newHero({
    id: randomId(),
    level: 3,
    characterClass: HeroClasses.Cleric,
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

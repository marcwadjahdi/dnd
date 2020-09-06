import {Injectable} from '@angular/core';
import {Hero, newHero} from './hero.model';
import {HeroClasses} from '../common/character-classes';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private static readonly Heroes: Hero[] = [
    newHero({
      level: 4,
      characterClass: HeroClasses.Rogue,
      name: 'Lokee',
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
      level: 3,
      characterClass: HeroClasses.Sorcerer,
      name: 'Zalkas Eärendil',
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
      level: 3,
      characterClass: HeroClasses.Druid,
      name: 'Nauthime Mario',
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
      level: 4,
      characterClass: HeroClasses.Cleric,
      name: 'Augustin',
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

  constructor() {
  }


  search(params: any = {}): Hero[] {
    return HeroService.Heroes;
  }
}

import {Identified} from '../common/identified';
import {Named} from '../common/named';
import {CharacterType} from './character-type';
import {CharacterSize} from './character-size';
import {CreatureType} from './creature-type';
import {Attributes} from './attributes';
import {ChallengeRating} from './challenge-rating';
import {CharacterClass} from './character-class';

export interface Character extends Identified, Named {
  characterType?: CharacterType;
  creatureType?: CreatureType;

  characterSize?: CharacterSize;

  hp?: number;
  maxHP?: number;

  attributes?: Attributes;

  /* PC */
  level?: number;
  characterClass?: CharacterClass;

  /* NPC */
  hostile?: boolean;
  cr?: ChallengeRating;
}

import {Identified} from '../common/identified';
import {Named} from '../common/named';
import {CharacterType} from './enums/character-type.enum';
import {CharacterSize} from './enums/character-size.enum';
import {CreatureType} from './enums/creature-type.enum';
import {Attributes} from './models/attributes.model';
import {ChallengeRating} from './enums/challenge-rating.enum';
import {CharacterClass} from './enums/character-class.enum';

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

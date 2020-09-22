import {HasAttributes} from './has-attributes';
import {Identified} from '../../common/identified';
import {Named} from '../../common/named';
import {HasClass} from './character-classes';
import {HasHealth} from './has-health';
import {CharacterType} from './character-types';

export interface Character extends Identified, Named, HasHealth, HasAttributes, HasClass {
  type?: CharacterType;
  hostile?: boolean;
}

import {CharacterType} from './character-types';
import {HasHealth} from './hasHealth';
import {HasClass} from './character-classes';
import {HasAttributes} from './has-attributes';
import {Identified} from '../../common/identified';
import {Named} from '../../common/named';


export interface Character extends Identified, Named, HasHealth, HasAttributes, HasClass {
  type?: CharacterType;
  hostile?: boolean;
}

import {ItemType} from './item-type';
import {Identified} from '../common/identified';
import {Named} from '../common/named';
import {Valubable} from './valuable';

export interface Item extends Identified, Named, Valubable {
  type?: ItemType;
}

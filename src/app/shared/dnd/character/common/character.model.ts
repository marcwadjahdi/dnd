import {Attributes, HasAttributes, HasItems, HasLevel, Identified, Item, Named} from 'src/app/shared/dnd';
import {HasType, Type} from './hasType';
import {HasHealth} from './hasHealth';
import {Class, HasClass} from './hasClass';


export interface Character extends HasType, Identified, Named, HasLevel, HasAttributes, HasItems, HasHealth, HasClass {
}

import {HasAttributes, HasItems, HasLevel, Identified, Named} from 'src/app/shared/dnd';


export interface Character extends Identified, Named, HasLevel, HasAttributes, HasItems {
}
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Character} from 'src/app/shared/dnd/character/character.model';

export const PcFeature = 'PCs';

export interface PcState extends EntityState<Character> {
  pc: Character;
}

export interface PcPartialState {
  [PcFeature]: PcState;
}

export const PCAdatapter: EntityAdapter<Character> = createEntityAdapter<Character>();


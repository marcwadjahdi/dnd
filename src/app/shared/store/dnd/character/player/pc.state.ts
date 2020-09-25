import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Character} from 'src/app/shared/models/character/character';

export const PcFeature = 'Players';

export interface PcState extends EntityState<Character> {
  player: Character;
}

export interface PcPartialState {
  [PcFeature]: PcState;
}

export const PlayerAdatapter: EntityAdapter<Character> = createEntityAdapter<Character>();


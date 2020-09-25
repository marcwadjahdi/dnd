import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Character} from 'src/app/shared/models/character/character';

export const NpcFeature = 'Npcs';

export interface NpcState extends EntityState<Character> {
  filters: {
    name: string;
    hostile: boolean;
  };
  npc: Character;
}

export interface NpcCharacterPartialState {
  [NpcFeature]: NpcState;
}

export const NpcAdapter: EntityAdapter<Character> = createEntityAdapter<Character>();


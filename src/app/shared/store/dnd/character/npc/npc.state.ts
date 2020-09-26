import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Character} from 'src/app/shared/dnd/character/character.model';

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


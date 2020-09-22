import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {PlayerCharacter} from 'src/app/shared/models/character/player/player-character';

export const PlayerFeature = 'Players';

export interface PlayerCharacterState extends EntityState<PlayerCharacter> {
  player: PlayerCharacter;
}

export interface PlayerCharacterPartialState {
  [PlayerFeature]: PlayerCharacterState;
}

export const PlayerAdatapter: EntityAdapter<PlayerCharacter> = createEntityAdapter<PlayerCharacter>();


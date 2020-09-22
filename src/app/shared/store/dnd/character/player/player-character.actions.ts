import {createAction, props} from '@ngrx/store';
import {PlayerCharacter} from 'src/app/shared/models/character/player/player-character';

const prefix = '[PlayerCharacter]';

export const PlayerCharacterActions = {
  OpenEditPlayer: createAction(`${prefix} Open player edition`, props<{ player: PlayerCharacter }>()),
  CloseEditPlayer: createAction(`${prefix} Close player edition`),
  EditPlayer: createAction(`${prefix} Edit Player`, props<{ player: PlayerCharacter }>()),

  RemovePlayer: createAction(`${prefix} Remove Player`, props<{ id: number }>()),
};

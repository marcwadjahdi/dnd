import {createAction, props} from '@ngrx/store';
import {Character} from 'src/app/shared/models/character/character';

const prefix = '[Character]';

export const PcActions = {
  OpenEditPlayer: createAction(`${prefix} Open player edition`, props<{ player: Character }>()),
  CloseEditPlayer: createAction(`${prefix} Close player edition`),
  EditPlayer: createAction(`${prefix} Edit Player`, props<{ player: Character }>()),

  RemovePlayer: createAction(`${prefix} Remove Player`, props<{ id: number }>()),
};

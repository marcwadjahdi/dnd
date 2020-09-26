import {createAction, props} from '@ngrx/store';
import {Character} from 'src/app/shared/dnd/character/character.model';

const prefix = '[Character]';

export const PcActions = {
  OpenEditPC: createAction(`${prefix} Open player edition`, props<{ pc: Character }>()),
  CloseEditPC: createAction(`${prefix} Close player edition`),
  EditPC: createAction(`${prefix} Edit Player`, props<{ pc: Character }>()),

  RemovePC: createAction(`${prefix} Remove Player`, props<{ id: number }>()),
};

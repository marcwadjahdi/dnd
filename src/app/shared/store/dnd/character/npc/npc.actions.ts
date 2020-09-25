import {createAction, props} from '@ngrx/store';
import {Character} from 'src/app/shared/models/character/character';

const prefix = '[NPCCharacter]';

export const NpcActions = {
  OpenEditNPC: createAction(`${prefix} Open NPC edition`, props<{ npc: Character }>()),
  CloseEditNPC: createAction(`${prefix} Close NPC edition`),
  EditNPC: createAction(`${prefix} Edit NPC`, props<{ npc: Character }>()),

  RemoveNPC: createAction(`${prefix} Remove NPC`, props<{ id: number }>()),
};

import {createAction, props} from '@ngrx/store';
import {Character} from 'src/app/shared/dnd/character/character.model';

const prefix = '[NPCCharacter]';

export const NpcActions = {
  OpenEditNPC: createAction(`${prefix} Open NPC edition`, props<{ npc: Character }>()),
  CloseEditNPC: createAction(`${prefix} Close NPC edition`),
  EditNPC: createAction(`${prefix} Edit NPC`, props<{ npc: Character }>()),

  RemoveNPC: createAction(`${prefix} Remove NPC`, props<{ id: number }>()),
};

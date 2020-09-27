import {createReducer, on} from '@ngrx/store';
import {NpcActions} from './npc.actions';
import {NpcAdapter} from './npc.state';
import {NonPlayerCharacters} from '../../../../dnd/character/data/npc.constants';

function initialState() {
  return NpcAdapter.addMany(NonPlayerCharacters, NpcAdapter.getInitialState({
    filters: {name: null, hostile: null},
    npc: null,
  }));
}

const setNPC = (state, {npc}) => Object.assign({}, state, {npc});
const unsetNPC = state => Object.assign({}, state, {npc: null});
const saveNPC = (state, {npc}) => NpcAdapter.upsertOne(npc, unsetNPC(state));
const deleteOne = (state, {id}) => NpcAdapter.removeOne(id, state);

const reducer = createReducer(initialState(),
  on(NpcActions.OpenEditNPC, setNPC),
  on(NpcActions.CloseEditNPC, unsetNPC),
  on(NpcActions.EditNPC, saveNPC),
  on(NpcActions.RemoveNPC, deleteOne),
);

export const NpcReducer = ((state, action) => reducer(state, action));

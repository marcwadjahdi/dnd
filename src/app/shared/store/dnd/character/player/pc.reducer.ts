import {createReducer, on} from '@ngrx/store';
import {PcActions} from './pc.actions';
import {PlayerAdatapter} from './pc.state';

function initialState() {
  return PlayerAdatapter.getInitialState({player: null});
}

const setPlayer = (state, {player}) => Object.assign({}, state, {player});
const unsetPlayer = state => Object.assign({}, state, {player: null});
const savePlayer = (state, {player}) => PlayerAdatapter.upsertOne(player, unsetPlayer(state));
const deleteOne = (state, {id}) => PlayerAdatapter.removeOne(id, state);

const reducer = createReducer(initialState(),
  on(PcActions.OpenEditPlayer, setPlayer),
  on(PcActions.CloseEditPlayer, unsetPlayer),
  on(PcActions.EditPlayer, savePlayer),
  on(PcActions.RemovePlayer, deleteOne),
);

export const PcReducer = ((state, action) => reducer(state, action));

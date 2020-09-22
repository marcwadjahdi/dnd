import {createReducer, on} from '@ngrx/store';
import {PlayerCharacterActions} from './player-character.actions';
import {PlayerAdatapter} from './player-character.state';

function initialState() {
  return PlayerAdatapter.getInitialState({selected: null});
}

const setPlayer = (state, {player}) => Object.assign({}, state, {player});
const unsetPlayer = state => Object.assign({}, state, {hero: null});
const savePlayer = (state, {player}) => PlayerAdatapter.upsertOne(player, unsetPlayer(state));
const deleteOne = (state, {id}) => PlayerAdatapter.removeOne(id, state);

const reducer = createReducer(initialState(),
  on(PlayerCharacterActions.OpenEditPlayer, setPlayer),
  on(PlayerCharacterActions.CloseEditPlayer, unsetPlayer),
  on(PlayerCharacterActions.EditPlayer, savePlayer),
  on(PlayerCharacterActions.RemovePlayer, deleteOne),
);

export const PlayerCharacterReducer = ((state, action) => reducer(state, action));

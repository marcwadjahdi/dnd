import {createReducer, on} from '@ngrx/store';
import {PcActions} from './pc.actions';
import {PCAdatapter} from './pc.state';

function initialState() {
  return PCAdatapter.getInitialState({pc: null});
}

const setPC = (state, {pc}) => Object.assign({}, state, {pc});
const unsetPC = state => Object.assign({}, state, {pc: null});
const savePC = (state, {pc}) => PCAdatapter.upsertOne(pc, unsetPC(state));
const deleteOne = (state, {id}) => PCAdatapter.removeOne(id, state);

const reducer = createReducer(initialState(),
  on(PcActions.OpenEditPC, setPC),
  on(PcActions.CloseEditPC, unsetPC),
  on(PcActions.EditPC, savePC),
  on(PcActions.RemovePC, deleteOne),
);

export const PcReducer = ((state, action) => reducer(state, action));

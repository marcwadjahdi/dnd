import {createReducer, on} from '@ngrx/store';
import * as _ from 'lodash';
import {BattleActions} from './battle.actions';
import {randomId} from 'src/app/shared/dnd/common/identified';
import {deepCopy} from '../../../util/deep-copy';
import {BattleTurn} from '../../../dnd/battle/battle';

function initialState() {
  return {
    active: null,
    archived: [],
  };
}

const startBattle = (state, {turn}) => {
  const start = {start: new Date()};
  const initiative = sortInitiative(turn);
  const currentTurn = {
    id: 0,
    initiative,
    active: initiative[0],
    ...deepCopy(turn),
  };
  currentTurn.characters[currentTurn.active].active = true;

  return {
    ...endBattle(state),
    active: {
      ...start,
      id: randomId(),
      turns: [],
      currentTurn,
    },
  };
};

const endBattle = (state) => {
  const archived = [];
  if (state.active) {
    const active = deepCopy(state.active);
    const end = new Date();
    active.currentTurn.end = end;
    active.end = end;
    archived.push(active);
  }
  archived.push(state.archived);
  return {active: null, archived};
};

const previousTurn = (state) => {
  const currentTurnId = state.active.currentTurn.id;
  if (currentTurnId === 0) {
    return state;
  }
  const newState = deepCopy(state);
  const previousId = currentTurnId - 1;
  newState.active.currentTurn = {...newState.active.turns[previousId]};
  newState.active.turns.pop();
  return newState;
};

const nextTurn = (state, {turn}) => {
  const currentTurnId = turn.id;
  const newTurn = deepCopy(turn);
  newTurn.id = currentTurnId + 1;
  newTurn.characters[newTurn.active].active = false;
  const activeIndex = _.indexOf(newTurn.initiative, newTurn.active);
  newTurn.active = activeIndex + 1 === newTurn.initiative.length ? newTurn.initiative[0] : newTurn.initiative[activeIndex + 1];
  newTurn.characters[newTurn.active].active = true;

  const newState = deepCopy(state);
  newState.active.turns[currentTurnId] = turn;
  newState.active.currentTurn = newTurn;
  return newState;
};

const addOrEditCharacter = (state, character) => {
  const newState = deepCopy(state);
  newState.active.currentTurn.characters[character.id] = deepCopy(character);
  state.active.currentTurn.initiative = sortInitiative(newState.active.currentTurn);
  return newState;
};

const removeCharacter = (state, id) => {
  const newState = deepCopy(state);
  delete newState.active.currentTurn.characters[id];
  state.active.currentTurn.initiative = sortInitiative(newState.active.currentTurn);
  return newState;
};

function sortInitiative(turn: BattleTurn) {
 return _.orderBy(turn.characters, 'initiative', 'desc').map(it => it.id);
}

const reducer = createReducer(initialState(),
  on(BattleActions.StartBattle, startBattle),
  on(BattleActions.EndBattle, endBattle),

  on(BattleActions.PreviousTurn, previousTurn),
  on(BattleActions.NextTurnReady, nextTurn),

  on(BattleActions.AddCharacter, addOrEditCharacter),
  on(BattleActions.EditCharacter, addOrEditCharacter),
  on(BattleActions.RemoveCharacter, removeCharacter),
);

export const BattleReducer = ((state, action) => reducer(state, action));

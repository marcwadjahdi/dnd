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

const startBattle = (state, turn0) => {
  const start = {start: new Date()};
  return {
    ...endBattle(state),
    active: {
      ...start,
      id: randomId(),
      currentTurn: {
        id: 0,
        initiative: sortInitiative(turn0.active.currentTurn),
        ...turn0,
      }
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
  delete newState.active.turns[previousId];
  return newState;
};

const nextTurn = (state, turn) => {
  const currentTurnId = turn.id;
  const newState = deepCopy(state);
  newState.active.turns[currentTurnId] = deepCopy(turn);

  turn.id++;
  turn.characters[turn.active].active = false;
  const activeIndex = _.indexOf(turn.initiative, turn.active);
  turn.active = activeIndex + 1 === turn.initiative.length ? 0 : turn.initiative[activeIndex + 1];
  turn.characters[turn.active].active = true;

  newState.active.currentTurn = turn;
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
  _.orderBy(turn.characters).map(it => it.id);
}


const reducer = createReducer(initialState(),
  on(BattleActions.BattleStarted, startBattle),
  on(BattleActions.EndBattle, endBattle),

  on(BattleActions.PreviousTurn, previousTurn),
  on(BattleActions.NextTurnReady, nextTurn),

  on(BattleActions.AddCharacter, addOrEditCharacter),
  on(BattleActions.EditCharacter, addOrEditCharacter),
  on(BattleActions.RemoveCharacter, removeCharacter),
);

export const BattleReducer = ((state, action) => reducer(state, action));

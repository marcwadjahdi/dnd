import {createReducer, on} from '@ngrx/store';
import * as _ from 'lodash';
import {BattleActions} from './battle.actions';
import {randomId} from 'src/app/shared/models/common/identified';
import {deepCopy} from '../../../util/deep-copy';
import {BattleState} from './battle.state';

function initialState() {
  return {
    active: null,
    archived: [],
  };
}

const startBattle = (state, turn0) => {
  return {
    ...endBattle(state),
    active: {
      id: randomId(),
      start: new Date(),
      currentTurn: {
        id: 0,
        start: new Date(),
        ...turn0,
      },
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
  state.active.currentTurn.initiative = sortInitiative(newState);
  return newState;
};

const removeCharacter = (state, id) => {
  const newState = deepCopy(state);
  delete newState.active.currentTurn.characters[id];
  state.active.currentTurn.initiative = sortInitiative(newState);
  return newState;
};


function sortInitiative(state: BattleState) {
  _.orderBy(state.active.currentTurn.characters).map(it => it.id);
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

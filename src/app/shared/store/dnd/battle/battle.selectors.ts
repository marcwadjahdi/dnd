import {createFeatureSelector, createSelector} from '@ngrx/store';
import {BattleFeature, BattleState} from './battle.state';

const selectState = createFeatureSelector<BattleState>(BattleFeature);
const selectAllBattles = createSelector(selectState, state => [state.active, ...state.archived].sort((a, b) => a.start.getTime() - b.start.getTime()));
const selectActiveBattle = createSelector(selectState, state => state.active);
const selectCurrentTurn = createSelector(selectActiveBattle, battle => battle?.currentTurn);
const selectBattleCharacters = createSelector(selectCurrentTurn, turn => turn && turn.characters ? turn.initiative.map(id => turn.characters[id]) : []);
const selectActiveCharacter = createSelector(selectCurrentTurn, turn => turn?.characters[turn.active]);
const selectCharacter = (id) => createSelector(selectCurrentTurn, turn => turn?.characters[id]);

export const BattleSelectors = {
  Battles: selectAllBattles,
  Battle: selectActiveBattle,
  Turn: selectCurrentTurn,
  Characters: selectBattleCharacters,
  ActiveCharacter: selectActiveCharacter,
  SelectCharacter: selectCharacter,
};

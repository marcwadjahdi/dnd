import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PlayerAdatapter, PlayerFeature, PlayerCharacterState} from './player-character.state';

const selectState = createFeatureSelector<PlayerCharacterState>(PlayerFeature);
const {selectAll} = PlayerAdatapter.getSelectors();

const Playeres = createSelector(selectState, selectAll);
const Player = createSelector(selectState, state => state.player);

export const PlayerCharacterSelectors = {
  Players: Playeres,
  Player,
};

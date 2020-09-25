import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PlayerAdatapter, PcFeature, PcState} from './pc.state';

const selectState = createFeatureSelector<PcState>(PcFeature);
const {selectAll} = PlayerAdatapter.getSelectors(selectState);

const Players = selectAll;
const Player = createSelector(selectState, state => state.player);

export const PcSelectors = {
  Players,
  Player,
};

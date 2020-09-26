import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PCAdatapter, PcFeature, PcState} from './pc.state';

const selectState = createFeatureSelector<PcState>(PcFeature);
const {selectAll} = PCAdatapter.getSelectors(selectState);

const Players = selectAll;
const Player = createSelector(selectState, state => state.pc);

export const PcSelectors = {
  Players,
  Player,
};

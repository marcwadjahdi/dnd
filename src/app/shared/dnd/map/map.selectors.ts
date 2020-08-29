import {createFeatureSelector, createSelector} from '@ngrx/store';
import {BATTLE_MAP_FEATURE, BattleMapState} from './map.state';

const selectState = createFeatureSelector<BattleMapState>(BATTLE_MAP_FEATURE);

const Map = createSelector(selectState, s => s.map);

export const MapSelectors = {
  Map
};

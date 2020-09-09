import {createFeatureSelector, createSelector} from '@ngrx/store';
import {HeroAdatapter, HeroFeature, HeroState} from './hero.state';

const selectState = createFeatureSelector<HeroState>(HeroFeature);
const {selectAll, selectEntities, selectTotal} = HeroAdatapter.getSelectors();

const Heroes = createSelector(selectState, selectAll);

const Total = createSelector(selectState, selectTotal);

const SelectedHero = createSelector(selectState, state => state.selected);

export const HeroSelectors = {
  Heroes,
  Total,
  SelectedHero,
};

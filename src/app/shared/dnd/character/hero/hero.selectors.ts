import {createFeatureSelector, createSelector} from '@ngrx/store';
import {HeroAdatapter, HeroState} from './hero.state';
import {Hero} from './hero.model';

const selectState = createFeatureSelector<HeroState>(Hero.FeatureName);
const {selectAll, selectEntities, selectTotal} = HeroAdatapter.getSelectors();

const Heroes = createSelector(selectState, selectAll);

const Total = createSelector(selectState, selectTotal);

const SelectedHero = createSelector(selectState, state => state.selected);

export const HeroSelectors = {
  Heroes,
  Total,
  SelectedHero,
};

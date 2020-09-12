import {createFeatureSelector, createSelector} from '@ngrx/store';
import {HeroAdatapter, HeroFeature, HeroState} from './hero.state';

const selectState = createFeatureSelector<HeroState>(HeroFeature);
const {selectAll} = HeroAdatapter.getSelectors();

const Heroes = createSelector(selectState, selectAll);
const Hero = createSelector(selectState, state => state.hero);

export const HeroSelectors = {
  Heroes,
  Hero,
};

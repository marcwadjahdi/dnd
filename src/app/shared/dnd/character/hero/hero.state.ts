import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Hero} from './hero.model';

export interface HeroState extends EntityState<Hero> {
  selected: Hero;
}

export interface HeroPartialState {
  [Hero.FeatureName]: HeroState;
}

export const HeroAdatapter: EntityAdapter<Hero> = createEntityAdapter<Hero>();


import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Hero} from './hero.model';

export const HeroFeature = 'Heroes';

export interface HeroState extends EntityState<Hero> {
  selected: Hero;
}

export interface HeroPartialState {
  [HeroFeature]: HeroState;
}

export const HeroAdatapter: EntityAdapter<Hero> = createEntityAdapter<Hero>();


import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Hero} from './hero.model';

export const HeroFeature = 'Heroes';

export interface HeroState extends EntityState<Hero> {
  hero: Hero;
}

export interface HeroPartialState {
  [HeroFeature]: HeroState;
}

export const HeroAdatapter: EntityAdapter<Hero> = createEntityAdapter<Hero>();


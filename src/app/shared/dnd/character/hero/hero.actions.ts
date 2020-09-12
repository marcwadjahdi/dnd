import {createAction, props} from '@ngrx/store';
import {Hero} from './hero.model';

export const HeroActions = {
  OpenEditHero: createAction('[Hero] Open hero edition', props<{ hero: Hero }>()),
  CloseEditHero: createAction('[Hero] Close hero edition'),
  EditHero: createAction('[Hero] Edit Hero', props<{ hero: Hero }>()),

  RemoveHero: createAction('[Hero] Remove Hero', props<{ id: number }>()),
};

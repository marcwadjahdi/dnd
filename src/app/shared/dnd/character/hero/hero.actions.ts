import {createAction, props} from '@ngrx/store';
import {Hero} from './hero.model';

const searchHeroes = createAction('[Hero] Searching Heroes...');
const searchHeroesSuccess = createAction('[Hero] Heroes retrieved', props<{ heroes: Hero[] }>());
const searchHeroesException = createAction('[Hero] Failed to search heroes.', props<{ exception: any }>());

export const HeroActions = {
  SearchHeroes: searchHeroes,
  SearchHeroesSuccess: searchHeroesSuccess,
  SearchHeroesException: searchHeroesException,
};

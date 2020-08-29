import {createAction, props} from '@ngrx/store';
import {Hero} from './hero.model';

export enum HeroActionTypes {
    SearchHeroes = '[Hero] Searching Heroes...',
    SearchHeroesSuccess = '[Hero] Heroes retrieved',
    SearchHeroesException = '[Hero] Failed to search heroes.',

    GetHero = '[Hero] Getting a Hero...',
    GetHeroSuccess = '[Hero] Hero retrieved.',
    GetHeroException = '[Hero] Failed to retrieve hero.',

    SelectHero = '[Hero] Selecting a Hero...',
    SelectHeroSuccess = '[Hero] Hero successfully selected.',
    SelectHeroException = '[Hero] Failed to select hero.',

    CreateHero = '[Hero] Creating a Hero...',
    CreateHeroSuccess = '[Hero] Hero successfully created.',
    CreateHeroException = '[Hero] Failed to create hero.',
}

const types = HeroActionTypes;

const searchHeroes = createAction(types.SearchHeroes);
const searchHeroesSuccess = createAction(types.SearchHeroesSuccess, props<{ heroes: Array<Hero> }>());
const searchHeroesException = createAction(types.SearchHeroesException, props<{ exception: any }>());

export const HeroActions = {
    SearchHeroes: searchHeroes,
    SearchHeroesSuccess: searchHeroesSuccess,
    SearchHeroesException: searchHeroesException,
};

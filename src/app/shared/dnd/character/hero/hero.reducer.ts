import {createReducer, on} from '@ngrx/store';
import {HeroActions} from './hero.actions';
import {HeroAdatapter, HeroState} from './hero.state';

const initialState: HeroState = HeroAdatapter.getInitialState({
  selected: null,
});


const reducer = createReducer(initialState,
  // Search
  on(HeroActions.SearchHeroesSuccess, (state, {heroes}) => HeroAdatapter.addMany(heroes, state)),
  on(HeroActions.SearchHeroesException, (state, {exception}) => HeroAdatapter.removeAll(state)),
);
export const HeroReducer = ((state, action) => reducer(state, action));

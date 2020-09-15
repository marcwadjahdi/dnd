import {createReducer, on} from '@ngrx/store';
import {HeroActions} from './hero.actions';
import {HeroAdatapter} from './hero.state';
import {IrrandiaSHeroes} from './hero.constants';


function initialState() {
  return HeroAdatapter.addMany(IrrandiaSHeroes, HeroAdatapter.getInitialState({selected: null}));
}

const setHero = (state, {hero}) => Object.assign({}, state, {hero});
const unsetHero = state => Object.assign({}, state, {hero: null});
const saveHero = (state, {hero}) => HeroAdatapter.upsertOne(hero, unsetHero(state));
const deleteOne = (state, {id}) => HeroAdatapter.removeOne(id, state);

const reducer = createReducer(initialState(),
  on(HeroActions.OpenEditHero, setHero),
  on(HeroActions.CloseEditHero, unsetHero),
  on(HeroActions.EditHero, saveHero),
  on(HeroActions.RemoveHero, deleteOne),
);

export const HeroReducer = ((state, action) => reducer(state, action));

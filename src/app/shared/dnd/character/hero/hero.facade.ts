import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {DndState} from '../../../store/dnd.state';
import {HeroSelectors} from './hero.selectors';
import {HeroActions} from './hero.actions';

@Injectable({
  providedIn: 'root'
})
export class HeroFacade {

  readonly heroes$ = this.store.select(HeroSelectors.Heroes);

  constructor(private store: Store<DndState>) {
  }

  searchHeroes(): void {
    this.store.dispatch(HeroActions.SearchHeroes());
  }
}

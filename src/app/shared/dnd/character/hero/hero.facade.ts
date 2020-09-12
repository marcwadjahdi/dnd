import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {HeroSelectors} from './hero.selectors';
import {HeroActions} from './hero.actions';
import {DndState} from 'src/app/shared/store/dnd.state';
import {Hero} from './hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroFacade {

  readonly heroes$ = this.store.select(HeroSelectors.Heroes);
  readonly hero$ = this.store.select(HeroSelectors.Hero);

  constructor(private store: Store<DndState>) {
  }

  openCreation() {
    this.store.dispatch(HeroActions.OpenEditHero({
      hero: {
        attributes: {}
      }
    }));
  }

  openEdition(hero: Hero) {
    this.store.dispatch(HeroActions.OpenEditHero({hero}));
  }

  saveHero(hero: Hero) {
    this.store.dispatch(HeroActions.EditHero({hero}));
  }

  closeEdition() {
    this.store.dispatch(HeroActions.CloseEditHero());
  }

  deleteByID(id: number) {
    this.store.dispatch(HeroActions.RemoveHero({id}));
  }
}

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {HeroActions} from './hero.actions';
import {HeroService} from './hero.service';

@Injectable()
export class HeroEffects {

  searchHeroes = createEffect(() => this.actions$.pipe(
    ofType(HeroActions.SearchHeroes),
    map((action) => HeroActions.SearchHeroesSuccess({heroes: this.service.search()})),
  ));

  constructor(private actions$: Actions, private service: HeroService) {
  }
}

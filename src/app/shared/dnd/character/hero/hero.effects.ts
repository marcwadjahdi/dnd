import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {HeroActions, HeroActionTypes} from './hero.actions';
import {HeroService} from './hero.service';
import {of} from 'rxjs';

@Injectable()
export class HeroEffects {

  searchHeroes = createEffect(() => this.actions$.pipe(
    ofType(HeroActionTypes.SearchHeroes),
    mergeMap(() => this.service.search().pipe(
      map(heroes => HeroActions.SearchHeroesSuccess({heroes})),
      catchError(exception => of(HeroActions.SearchHeroesException({exception})))
    ))
  ));

  constructor(private actions$: Actions, private service: HeroService) {
  }
}

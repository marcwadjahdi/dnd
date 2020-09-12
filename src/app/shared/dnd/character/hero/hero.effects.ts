import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {HeroActions} from './hero.actions';
import {HeroService} from './hero.service';

@Injectable()
export class HeroEffects {

  constructor(private actions$: Actions, private service: HeroService) {
  }
}

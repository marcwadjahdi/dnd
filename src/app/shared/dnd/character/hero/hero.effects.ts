import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {HeroService} from './hero.service';

@Injectable()
export class HeroEffects {

  constructor(private actions$: Actions, private service: HeroService) {
  }
}

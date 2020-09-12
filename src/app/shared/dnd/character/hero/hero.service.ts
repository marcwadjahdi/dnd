import {Injectable} from '@angular/core';
import {Hero} from './hero.model';
import {IrrandiaSHeroes} from './hero.constants';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() {
  }

  search(params: any = {}): Hero[] {
    return IrrandiaSHeroes;
  }
}

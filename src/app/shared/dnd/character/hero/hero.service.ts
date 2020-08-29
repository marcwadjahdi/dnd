import {Injectable} from '@angular/core';
import {Hero} from './hero.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private static readonly Heroes: Hero[] = [
    new Hero({id: 1, name: 'Amrod Yajerit'}),
    new Hero({id: 2, name: 'Lokee'}),
    new Hero({id: 3, name: 'Zaklas'}),
    new Hero({id: 4, name: 'Nauthime Mario'}),
    new Hero({id: 5, name: 'Augustin'}),
  ];

  constructor() {
  }

  search(params: any = {}): Observable<Array<Hero>> {
    return of(HeroService.Heroes);
  }
}

import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {MapSelectors} from './map.selectors';
import {DndState} from '../../store/dnd.state';

@Injectable({
  providedIn: 'root'
})
export class MapFacade {

  readonly map$ = this.store.select(MapSelectors.Map);

  constructor(private store: Store<DndState>) {
  }
}

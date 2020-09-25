import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {PcSelectors} from './pc.selectors';
import {PcActions} from './pc.actions';
import {DndState} from 'src/app/shared/store/dnd.state';
import {Character} from 'src/app/shared/models/character/character';

@Injectable({
  providedIn: 'root'
})
export class PcFacade {

  readonly players$ = this.store.select(PcSelectors.Players);
  readonly player$ = this.store.select(PcSelectors.Player);

  constructor(private store: Store<DndState>) {
  }

  openCreation() {
    this.store.dispatch(PcActions.OpenEditPlayer({
      player: {
        attributes: {strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1},
      }
    }));
  }

  openEdition(player: Character) {
    this.store.dispatch(PcActions.OpenEditPlayer({player}));
  }

  savePlayer(player: Character) {
    this.store.dispatch(PcActions.EditPlayer({player}));
  }

  closeEdition() {
    this.store.dispatch(PcActions.CloseEditPlayer());
  }

  deleteByID(id: number) {
    this.store.dispatch(PcActions.RemovePlayer({id}));
  }
}

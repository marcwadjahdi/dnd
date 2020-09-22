import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {PlayerCharacterSelectors} from './player-character.selectors';
import {PlayerCharacterActions} from './player-character.actions';
import {DndState} from 'src/app/shared/store/dnd.state';
import {PlayerCharacter} from '../../../../models/character/player/player-character';

@Injectable({
  providedIn: 'root'
})
export class PlayerCharacterFacade {

  readonly players$ = this.store.select(PlayerCharacterSelectors.Players);
  readonly player$ = this.store.select(PlayerCharacterSelectors.Player);

  constructor(private store: Store<DndState>) {
  }

  openCreation() {
    this.store.dispatch(PlayerCharacterActions.OpenEditPlayer({
      player: {
        attributes: {}
      }
    }));
  }

  openEdition(player: PlayerCharacter) {
    this.store.dispatch(PlayerCharacterActions.OpenEditPlayer({player}));
  }

  savePlayer(player: PlayerCharacter) {
    this.store.dispatch(PlayerCharacterActions.EditPlayer({player}));
  }

  closeEdition() {
    this.store.dispatch(PlayerCharacterActions.CloseEditPlayer());
  }

  deleteByID(id: number) {
    this.store.dispatch(PlayerCharacterActions.RemovePlayer({id}));
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PlayerCharacterFacade} from 'src/app/shared/store/dnd/character/player/player-character.facade';
import {PlayerCharacter} from '../../shared/models/character/player/player-character';

@Component({
  selector: 'dnd-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
})
export class PlayersListComponent implements OnInit, OnDestroy {

  players$: Observable<PlayerCharacter[]>;
  player$: Observable<PlayerCharacter>;

  constructor(private playerFacade: PlayerCharacterFacade) {
  }

  ngOnInit() {
    this.players$ = this.playerFacade.players$;
    this.player$ = this.playerFacade.player$;
  }

  ngOnDestroy() {
  }

  createNewPlayer() {
    this.playerFacade.openCreation();
  }

  editPlayer(player: PlayerCharacter) {
    this.playerFacade.openEdition(player);
  }

  deletePlayer(player: PlayerCharacter) {
    if (player.id) {
      this.playerFacade.deleteByID(player.id);
    }
  }

  classBadgeCls(player: PlayerCharacter) {
    return `${player.characterClass.name}-badge`;
  }
}

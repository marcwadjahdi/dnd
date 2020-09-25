import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PcFacade} from 'src/app/shared/store/dnd/character/player/pc.facade';
import {Character} from 'src/app/shared/models/character/character';

@Component({
  selector: 'dnd-players-list',
  templateUrl: './pc-list.component.html',
  styleUrls: ['./pc-list.component.scss'],
})
export class PcListComponent implements OnInit, OnDestroy {

  players$: Observable<Character[]>;

  constructor(private facade: PcFacade) {
  }

  ngOnInit() {
    this.players$ = this.facade.players$;
  }

  ngOnDestroy() {
  }

  createNewPlayer() {
    this.facade.openCreation();
  }

  editPlayer(player: Character) {
    this.facade.openEdition(player);
  }

  deletePlayer(player: Character) {
    this.facade.deleteByID(player.id);
  }

  classBadgeCls(player: Character) {
    return `${player.characterClass.name}-badge`;
  }
}

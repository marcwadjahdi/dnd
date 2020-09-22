import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PlayerCharacterFacade} from 'src/app/shared/store/dnd/character/player/player-character.facade';
import {deepCopy} from '../../../shared/util/deep-copy';
import {PlayerCharacterClasses} from '../../../shared/models/character/common/character-classes';
import {PlayerCharacter} from '../../../shared/models/character/player/player-character';
import {randomId} from '../../../shared/models/common/identified';

@Component({
  selector: 'dnd-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
})
export class PlayerDetailComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  playerClasses = Object.values(PlayerCharacterClasses);

  player: PlayerCharacter;

  constructor(private playerFacade: PlayerCharacterFacade) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.playerFacade.player$.subscribe(h => {
        if (h) {
          this.player = deepCopy(h);
          this.player.characterClass = h.characterClass;
        } else {
          this.player = undefined;
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }


  close() {
    this.playerFacade.closeEdition();
  }

  savePlayer() {
    if (!this.isPlayerValid()) {
      return;
    }
    if (!this.player.id) {
      this.player.id = randomId();
    }

    this.playerFacade.savePlayer(this.player);
  }

  isPlayerValid() {
    return this.player.name && this.player.characterClass
      && this.player.level && this.player.level >= 1 && this.player.level <= 20
      && this.player.attributes.strength && this.player.attributes.dexterity && this.player.attributes.constitution
      && this.player.attributes.intelligence && this.player.attributes.wisdom && this.player.attributes.charisma;
  }
}

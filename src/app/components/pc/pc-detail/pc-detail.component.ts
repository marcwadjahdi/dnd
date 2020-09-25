import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PcFacade} from 'src/app/shared/store/dnd/character/player/pc.facade';
import {deepCopy} from 'src/app/shared/util/deep-copy';
import {CharacterClasses} from 'src/app/shared/models/character/character-class';
import {Character} from 'src/app/shared/models/character/character';
import {randomId} from 'src/app/shared/models/common/identified';

@Component({
  selector: 'dnd-player-detail',
  templateUrl: './pc-detail.component.html',
  styleUrls: ['./pc-detail.component.scss'],
})
export class PcDetailComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  playerClasses = Object.values(CharacterClasses);

  player: Character;

  constructor(private facade: PcFacade) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.facade.player$.subscribe(h => {
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
    this.facade.closeEdition();
  }

  savePlayer() {
    if (!this.isPlayerValid()) {
      return;
    }
    if (!this.player.id) {
      this.player.id = randomId();
    }

    this.facade.savePlayer(this.player);
  }

  isPlayerValid() {
    return this.player.name && this.player.characterClass
      && this.player.level && this.player.level >= 1 && this.player.level <= 20
      && this.player.attributes.strength && this.player.attributes.dexterity && this.player.attributes.constitution
      && this.player.attributes.intelligence && this.player.attributes.wisdom && this.player.attributes.charisma;
  }
}

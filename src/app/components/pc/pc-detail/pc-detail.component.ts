import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PcFacade} from 'src/app/shared/store/dnd/character/pc/pc.facade';
import {deepCopy} from 'src/app/shared/util/deep-copy';
import {CharacterClasses} from 'src/app/shared/dnd/character/enums/character-class.enum';
import {Character} from 'src/app/shared/dnd/character/character.model';
import {randomId} from 'src/app/shared/dnd/common/identified';
import {ChallengeRating} from '../../../shared/dnd/character/enums/challenge-rating.enum';

@Component({
  selector: 'dnd-player-detail',
  templateUrl: './pc-detail.component.html',
  styleUrls: ['./pc-detail.component.scss'],
})
export class PcDetailComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  readonly keys = Object.keys;
  readonly characterClasses = CharacterClasses;

  pc: Character;

  constructor(private facade: PcFacade) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.facade.player$.subscribe(h => {
        if (h) {
          this.pc = deepCopy(h);
          this.pc.characterClass = this.characterClasses[this.pc.characterClass.name];
        } else {
          this.pc = undefined;
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
    if (!this.pc.id) {
      this.pc.id = randomId();
    }
    if (!this.pc.hp) {
      this.pc.hp = this.pc.maxHP;
    }

    this.facade.savePC(this.pc);
  }

  isPlayerValid() {
    return this.pc.name && this.pc.maxHP
      && this.pc.characterClass
      && this.pc.level && this.pc.level >= 1 && this.pc.level <= 20
      && this.pc.attributes.strength && this.pc.attributes.dexterity && this.pc.attributes.constitution
      && this.pc.attributes.intelligence && this.pc.attributes.wisdom && this.pc.attributes.charisma;
  }

  classBackground() {
    if (this.pc) {
      return `${this.pc.characterClass.name}-bg`;
    }
    return '';
  }
}

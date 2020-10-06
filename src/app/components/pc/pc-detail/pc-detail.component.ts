import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PcFacade} from 'src/app/shared/store/dnd/character/pc/pc.facade';
import {deepCopy} from 'src/app/shared/util/deep-copy';
import {CharacterClasses} from 'src/app/shared/dnd/character/enums/character-class.enum';
import {Character} from 'src/app/shared/dnd/character/character.model';
import {Characters} from '../../../shared/dnd/character/characters';

@Component({
  selector: 'dnd-player-detail',
  templateUrl: './pc-detail.component.html',
  styleUrls: ['./pc-detail.component.scss'],
})
export class PcDetailComponent implements OnInit, OnDestroy {

  readonly keys = Object.keys;
  readonly characterClasses = CharacterClasses;
  pc: Character;
  private subs: Subscription[] = [];

  constructor(private facade: PcFacade) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.facade.player$.subscribe(h => {
        if (h) {
          this.pc = deepCopy(h);
          if (this.pc.characterClass) {
            this.pc.characterClass = this.characterClasses[this.pc.characterClass.name];
          }
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

  savePC() {
    if (Characters.isValid(this.pc)) {
      this.facade.savePC(this.pc);
    }
  }

  classBackground() {
    return this.pc?.characterClass ? `${this.pc.characterClass.name}-bg` : '';
  }
}

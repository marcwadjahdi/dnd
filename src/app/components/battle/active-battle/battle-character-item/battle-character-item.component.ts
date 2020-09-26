import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BattleCharacter} from 'src/app/shared/dnd/battle/battle';

@Component({
  selector: 'dnd-battle-character-item',
  templateUrl: './battle-character-item.component.html',
  styleUrls: ['./battle-character-item.component.scss'],
})
export class BattleCharacterItemComponent implements OnInit, OnDestroy {

  @Input()
  deleteCallback: (character: BattleCharacter) => void;
  @Input()
  character: BattleCharacter;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  removeFromBattle() {
    if (this.deleteCallback) {
      this.deleteCallback(this.character);
    }
  }

  iconClass(character: BattleCharacter) {
    return `${character.characterClass.name}-icon`;
  }
}

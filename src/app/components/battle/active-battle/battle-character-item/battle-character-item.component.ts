import {Component, OnDestroy, OnInit} from '@angular/core';
import {BattleCharacter} from 'src/app/shared/models/battle/battle';

@Component({
  selector: 'dnd-battle-character-item',
  templateUrl: './battle-character-item.component.html',
  styleUrls: ['./battle-character-item.component.scss'],
})
export class BattleCharacterItemComponent implements OnInit, OnDestroy {

  character: BattleCharacter;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}

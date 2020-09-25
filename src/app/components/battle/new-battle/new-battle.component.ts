import {Component, OnDestroy, OnInit} from '@angular/core';
import {BattleCharacter} from 'src/app/shared/models/battle/battle';

@Component({
  selector: 'dnd-new-battle',
  templateUrl: './new-battle.component.html',
  styleUrls: ['./new-battle.component.scss'],
})
export class NewBattleComponent implements OnInit, OnDestroy {

  character: BattleCharacter;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}

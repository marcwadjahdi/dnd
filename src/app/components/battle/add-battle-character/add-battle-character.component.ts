import {Component, OnDestroy, OnInit} from '@angular/core';
import {BattleCharacter} from 'src/app/shared/dnd/battle/battle';
import {Closeable} from '../../../shared/util/closeable';

@Component({
  selector: 'dnd-add-battle-character',
  templateUrl: './add-battle-character.component.html',
  styleUrls: ['./add-battle-character.component.scss'],
})
export class AddBattleCharacterComponent implements OnInit, OnDestroy, Closeable {

  character: BattleCharacter;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  close(): void {
  }
}

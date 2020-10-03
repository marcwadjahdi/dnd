import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BattleCharacter} from 'src/app/shared/dnd/battle/battle';
import {CharacterType} from '../../../shared/dnd/character/enums/character-type.enum';

@Component({
  selector: 'dnd-battle-character-item',
  templateUrl: './battle-character-item.component.html',
  styleUrls: ['./battle-character-item.component.scss'],
})
export class BattleCharacterItemComponent implements OnInit, OnDestroy {

  @Input()
  allowEdition = true;

  @Input()
  character: BattleCharacter;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  iconClass(character: BattleCharacter) {
    const isPC = character.characterType === CharacterType.PC;
    const prefix = isPC ? character.characterClass.name : (character.hostile ? 'hostile' : 'friendly');
    return `${prefix}-icon`;
  }
}

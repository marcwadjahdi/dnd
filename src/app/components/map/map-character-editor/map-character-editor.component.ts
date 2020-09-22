import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CharacterType, CharacterTypes} from '../../../shared/models/character/common/character-types';
import {Character} from '../../../shared/models/character/common/character.model';
import {PlayerCharacter} from '../../../shared/models/character/player/player-character';

@Component({
  selector: 'dnd-map-character-editor',
  templateUrl: './map-character-editor.component.html',
  styleUrls: ['./map-character-editor.component.scss']
})
export class MapCharacterEditorComponent implements OnInit {
  @Input()
  character: Character;
  @Output()
  createdCharacter = new EventEmitter<Character>();

  characterTypes = CharacterTypes;

  players: PlayerCharacter[];
  player: PlayerCharacter;

  constructor() {
  }

  ngOnInit(): void {
    // this.players = this.playersService.search()
    //   .filter(player => !this.playersService.search(it => it.name === player.name))
    //   .map(h => {
    //     const copy = deepCopy(h);
    //     delete copy.id;
    //     copy.characterClass = h.characterClass;
    //     return copy;
    //   });
    // if (!this.character) {
    //   this.character = {};
    // }
  }

  canSumbit() {
    return !!this.character.name;
  }

  onSubmit() {
    if (this.canSumbit()) {
      this.createdCharacter.emit(this.character);
      this.character = {};
      this.player = null;
    }
  }

  title() {
    return this.character.id ? `Character ${this.character.name}` : 'Create Character';
  }

  onTypeSelect() {
    this.player = null;
  }

  isTypeDisabled() {
    return !!this.character.id;
  }

  isPlayer() {
    return this.character.type === CharacterType.Player;
  }

  isNPC() {
    return this.character.type === CharacterType.NPC;
  }

  onPlayerSelect() {
    this.character = {...this.player};
  }

  playerStr(h: PlayerCharacter) {
    return `Lvl ${h.level} ${h.characterClass.name} - ${h.name}`;
  }
}

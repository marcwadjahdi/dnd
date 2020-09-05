import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character, Type, TypeArray} from '../../shared/dnd/character/common';
import {Class, ClassArray} from '../../shared/dnd/character/common/hasClass';

@Component({
  selector: 'dnd-create-edit-character',
  templateUrl: './create-edit-character.component.html',
  styleUrls: ['./create-edit-character.component.scss']
})
export class CreateEditCharacterComponent implements OnInit {
  @Input()
  selectedCharacter: Character;

  @Input()
  isEdit: boolean;

  @Output()
  createdCharacter = new EventEmitter<Character>();

  character: Character = {
    name: '1',
    type: Type.Player,
    class: Class.cleric,
    actualHealth: 1,
    maxHealth: 1
  };
  type = Type;
  typeArray = TypeArray.values();
  classArray = ClassArray.values();

  constructor() {
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.character = this.selectedCharacter;
    }
  }

  canSumbit() {
    return this.character.name &&
      this.character.type &&
      // this.character.actualHealth &&
      // this.character.maxHealth &&
      // this.character.maxHealth >= this.character.actualHealth &&
      ((this.character.type === Type.Player && this.character.class) || this.character.type !== Type.Player);
  }

  onSubmit() {
    if (this.character.type !== Type.Player) {
      this.character.class = undefined;
    }
    this.createdCharacter.emit(this.character);
    this.character = {};
  }
}

import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MyCharacter, Type, TypeArray} from "../../shared/dnd/character/common";
import {ClassArray} from "../../shared/dnd/character/common/hasClass";

@Component({
  selector: 'dnd-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.scss']
})
export class CreateCharacterComponent implements OnInit {
  @Output()
  createdCharacter = new EventEmitter<MyCharacter>();

  character: MyCharacter = new MyCharacter();
  type = Type;
  typeArray = TypeArray.values();
  classArray = ClassArray.values();

  constructor() { }

  ngOnInit(): void {
  }

  canSumbit() {
    return this.character.name &&
      this.character.type &&
      this.character.actualHealth &&
      this.character.maxHealth &&
      this.character.maxHealth >= this.character.actualHealth &&
      ((this.character.type === Type.Player && this.character.class) || this.character.type !== Type.Player);
  }

  onSubmit() {
    if (this.character.type !== Type.Player) {
      this.character.class = undefined;
    }
    this.createdCharacter.emit(this.character);
    this.character = new MyCharacter();
  }
}

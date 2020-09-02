import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MyCharacter, Type, TypeArray} from "../shared/dnd/character/common";
import {ClassArray} from "../shared/dnd/character/common/hasClass";

@Component({
  selector: 'dnd-create-character-modal',
  templateUrl: './create-character-modal.component.html',
  styleUrls: ['./create-character-modal.component.scss']
})
export class CreateCharacterModalComponent {

  character: MyCharacter = new MyCharacter();
  type = Type;
  typeArray = TypeArray.values();
  classArray = ClassArray.values();


  constructor(public activeModal: NgbActiveModal) {}

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
    this.activeModal.close(this.character);
  }
}

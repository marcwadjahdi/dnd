import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MyCharacter, Type, TypeCharacterArray} from "../shared/dnd/character/common";

@Component({
  selector: 'dnd-create-character-modal',
  templateUrl: './create-character-modal.component.html',
  styleUrls: ['./create-character-modal.component.scss']
})
export class CreateCharacterModalComponent {

  character: MyCharacter;
  type = Type;
  characterType = TypeCharacterArray;

  constructor(public activeModal: NgbActiveModal) {
    this.character = new MyCharacter();
    this.character.type = null;
  }

  canSumbit() {
    return !this.character.name ||
      !this.character.type ||
      !this.character.actualHealth ||
      !this.character.maxHealth || this.character.maxHealth < this.character.actualHealth;
  }

  onSubmit() {
    this.canSumbit()
    this.activeModal.close(this.character);
  }
}

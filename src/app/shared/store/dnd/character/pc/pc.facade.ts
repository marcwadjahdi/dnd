import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {PcSelectors} from './pc.selectors';
import {PcActions} from './pc.actions';
import {DndState} from 'src/app/shared/store/dnd.state';
import {Character} from 'src/app/shared/dnd/character/character.model';
import {Characters} from '../../../../dnd/character/characters';
import {CharacterType} from '../../../../dnd/character/enums/character-type.enum';
import {CharacterSizes} from '../../../../dnd/character/enums/character-size.model';
import {CreatureType} from '../../../../dnd/character/enums/creature-type.enum';

@Injectable({
  providedIn: 'root'
})
export class PcFacade {

  readonly players$ = this.store.select(PcSelectors.Players);
  readonly player$ = this.store.select(PcSelectors.Player);

  constructor(private store: Store<DndState>) {
  }

  openCreation() {
    this.store.dispatch(PcActions.OpenEditPC({
      pc: {
        characterType: CharacterType.PC,
        characterSize: CharacterSizes.Medium,
        creatureType: CreatureType.Humanoid,
        attributes: {strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1},
      }
    }));
  }

  openEdition(pc: Character) {
    this.store.dispatch(PcActions.OpenEditPC({pc}));
  }

  savePC(character: Character) {
    const pc = Characters.saveCharacter(character);
    this.store.dispatch(PcActions.EditPC({pc}));
  }

  closeEdition() {
    this.store.dispatch(PcActions.CloseEditPC());
  }

  deleteByID(id: number) {
    this.store.dispatch(PcActions.RemovePC({id}));
  }
}

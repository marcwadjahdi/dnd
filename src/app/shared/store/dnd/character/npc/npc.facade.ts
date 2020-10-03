import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {NpcSelectors} from './npc.selectors';
import {NpcActions} from './npc.actions';
import {DndState} from 'src/app/shared/store/dnd.state';
import {Character} from 'src/app/shared/dnd/character/character.model';
import {ChallengeRating} from 'src/app/shared/dnd/character/enums/challenge-rating.enum';
import {CreatureType} from 'src/app/shared/dnd/character/enums/creature-type.enum';
import {Characters} from '../../../../dnd/character/characters';
import {CharacterType} from '../../../../dnd/character/enums/character-type.enum';
import {CharacterSize} from '../../../../dnd/character/enums/character-size.enum';
import {CharacterClasses} from '../../../../dnd/character/enums/character-class.enum';

@Injectable({
  providedIn: 'root'
})
export class NpcFacade {

  readonly npcs$ = this.store.select(NpcSelectors.NPCs);
  readonly npc$ = this.store.select(NpcSelectors.NPC);

  constructor(private store: Store<DndState>) {
  }

  openCreation() {
    this.store.dispatch(NpcActions.OpenEditNPC({
      npc: {
        characterType: CharacterType.NPC,
        characterSize: CharacterSize.Medium,
        creatureType: CreatureType.Humanoid,
        hostile: true,
        characterClass: CharacterClasses.HostileNPC,
        cr: ChallengeRating.CR_0,
        attributes: {strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1},
      }
    }));
  }

  openEdition(npc: Character) {
    this.store.dispatch(NpcActions.OpenEditNPC({npc}));
  }

  saveNPC(character: Character) {
    const npc = Characters.saveCharacter(character);
    this.store.dispatch(NpcActions.EditNPC({npc}));
  }

  closeEdition() {
    this.store.dispatch(NpcActions.CloseEditNPC());
  }

  deleteByID(id: number) {
    this.store.dispatch(NpcActions.RemoveNPC({id}));
  }

  filter(event) {

  }
}

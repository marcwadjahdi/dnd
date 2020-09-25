import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {DndState} from 'src/app/shared/store/dnd.state';
import {BattleActions} from './battle.actions';
import {BattleTurn} from 'src/app/shared/models/battle/battle';
import {Character} from 'src/app/shared/models/character/character';
import {BattleSelectors} from './battle.selectors';

@Injectable({
  providedIn: 'root'
})
export class BattleFacade {

  readonly battles$ = this.store.select(BattleSelectors.Battles);
  readonly battle$ = this.store.select(BattleSelectors.Battle);
  readonly turn$ = this.store.select(BattleSelectors.Turn);
  readonly characters$ = this.store.select(BattleSelectors.Characters);
  readonly character$ = this.store.select(BattleSelectors.ActiveCharacter);

  constructor(private store: Store<DndState>) {
  }

  openNewBattle() {
    this.store.dispatch(BattleActions.OpenNewBattle());
  }

  startBattle() {
    this.store.dispatch(BattleActions.StartBattle());
  }

  endBattle() {
    this.store.dispatch(BattleActions.EndBattle());
  }

  previousTurn() {
    this.store.dispatch(BattleActions.PreviousTurn());
  }

  nextTurn() {
    this.store.dispatch(BattleActions.NextTurn());
  }

  openAddCharacter() {
    this.store.dispatch(BattleActions.OpenAddCharacter());
  }

  addCharacter(character: Character) {
    this.store.dispatch(BattleActions.AddCharacter({character}));
  }

  editCharacter(character: Character) {
    this.store.dispatch(BattleActions.EditCharacter({character}));
  }

  removeCharacter(id: number) {
    this.store.dispatch(BattleActions.RemoveCharacter({id}));
  }
}

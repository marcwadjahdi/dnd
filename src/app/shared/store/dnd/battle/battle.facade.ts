import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {DndState} from 'src/app/shared/store/dnd.state';
import {BattleActions} from './battle.actions';
import {BattleCharacter, BattleTurn} from 'src/app/shared/dnd/battle/battle';
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

  /* Selectors */

  selectCharacter(id: number) {
    this.store.select(BattleSelectors.SelectCharacter(id));
  }

  /* Actions */

  openNewBattle() {
    this.store.dispatch(BattleActions.OpenNewBattle());
  }

  startBattle(turn: BattleTurn) {
    this.store.dispatch(BattleActions.StartBattle({turn}));
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

  openAddCharacters() {
    this.store.dispatch(BattleActions.OpenAddCharacters());
  }

  addCharacters(characters: BattleCharacter[]) {
    this.store.dispatch(BattleActions.AddCharacters({characters}));
  }

  editCharacter(id: number, modification: any) {
    this.store.dispatch(BattleActions.EditCharacter({id, modification}));
  }

  removeCharacter(id: number) {
    this.store.dispatch(BattleActions.RemoveCharacter({id}));
  }

  addFeature(feature: any) {
    this.store.dispatch(BattleActions.AddFeature());
  }

  editFeature(feature: any) {
    this.store.dispatch(BattleActions.EditFeature());
  }

  removeFeature(feature: any) {
    this.store.dispatch(BattleActions.RemoveFeature());
  }

  sync() {
    this.store.dispatch(BattleActions.SyncMap());
  }
}

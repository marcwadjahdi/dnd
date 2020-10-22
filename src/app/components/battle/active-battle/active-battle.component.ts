import {Component, OnDestroy, OnInit} from '@angular/core';
import {Battle, BattleCharacter, BattleTurn} from 'src/app/shared/dnd/battle/battle';
import {Observable} from 'rxjs';
import {BattleFacade} from 'src/app/shared/store/dnd/battle/battle.facade';
import {map} from 'rxjs/operators';
import {CharacterSizes} from '../../../shared/dnd/character/enums/character-size.model';
import {deepCopy} from '../../../shared/util/deep-copy';

@Component({
  selector: 'dnd-active-battle',
  templateUrl: './active-battle.component.html',
  styleUrls: ['./active-battle.component.scss'],
})
export class ActiveBattleComponent implements OnInit, OnDestroy {

  readonly sizes = Object.values(CharacterSizes);

  battle$: Observable<Battle>;
  turn$: Observable<BattleTurn>;
  characters$: Observable<BattleCharacter[]>;

  constructor(private facade: BattleFacade) {
  }

  ngOnInit() {
    this.battle$ = this.facade.battle$;
    this.turn$ = this.facade.turn$;
    this.characters$ = this.facade.characters$;
  }

  ngOnDestroy() {
  }

  newBattle() {
    this.facade.openNewBattle();
  }


  endBattle() {
    this.facade.endBattle();
  }

  previousTurn() {
    this.facade.previousTurn();
  }

  nextTurn() {
    this.facade.nextTurn();
  }

  openAddToBattle() {
    this.facade.openAddCharacters();
  }

  battleStarted(): Observable<boolean> {
    return this.battle$.pipe(map(it => !!it));
  }

  onTurn0(): Observable<boolean> {
    return this.turn$.pipe(map(it => !!it && it.id === 0));
  }

  onCharacterSizeSelected(character: BattleCharacter, selector) {
    const characterSize = {...CharacterSizes[selector.value]};
    this.facade.editCharacter(character.id, {characterSize});
    selector.value = null;
  }

  onCharacterHealthKeyPress(character: BattleCharacter, $event) {
    if ($event.key.toLowerCase() === 'enter') {
      const hp = character.hp  + parseInt($event.target.value, 10);
      this.facade.editCharacter(character.id, {hp});
      $event.target.value = null;
    }
  }
}

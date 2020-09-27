import {Component, OnDestroy, OnInit} from '@angular/core';
import {Battle, BattleCharacter, BattleTurn} from 'src/app/shared/dnd/battle/battle';
import {Observable} from 'rxjs';
import {BattleFacade} from 'src/app/shared/store/dnd/battle/battle.facade';
import {map} from 'rxjs/operators';

@Component({
  selector: 'dnd-active-battle',
  templateUrl: './active-battle.component.html',
  styleUrls: ['./active-battle.component.scss'],
})
export class ActiveBattleComponent implements OnInit, OnDestroy {

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
    this.facade.openAddCharacter();
  }

  battleStarted(): Observable<boolean> {
    return this.battle$.pipe(map(it => !!it));
  }

  onTurn0(): Observable<boolean> {
    return this.turn$.pipe(map(it => !!it && it.id === 0));
  }
}

import {createAction, props} from '@ngrx/store';
import {BattleCharacter, BattleTurn} from 'src/app/shared/dnd/battle/battle';

const prefix = '[Battle]';

export const BattleActions = {
  OpenNewBattle: createAction(`${prefix} New Battle`),
  StartBattle: createAction(`${prefix} StartBattle`, props<{ turn: BattleTurn }>()),
  BattleStarted: createAction(`${prefix} Battle Started`),

  EndBattle: createAction(`${prefix} End Battle`),
  BattleEnded: createAction(`${prefix} Battle Ended`),

  PreviousTurn: createAction(`${prefix} Previous Turn`),
  NextTurn: createAction(`${prefix} Next Turn`),
  NextTurnReady: createAction(`${prefix} Next Turn ready`, props<{ turn: BattleTurn }>()),

  OpenAddCharacter: createAction(`${prefix} Open Add Character`),
  AddCharacter: createAction(`${prefix} Add Character`, props<{ character: BattleCharacter }>()),

  EditCharacter: createAction(`${prefix} Edit Character`, props<{ character: BattleCharacter }>()),

  RemoveCharacter: createAction(`${prefix} Remove Character`, props<{ id: number }>()),

  SyncMap: createAction(`${prefix} Sync Map`),
};

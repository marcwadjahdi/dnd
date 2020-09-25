import {createAction, props} from '@ngrx/store';
import {Character} from 'src/app/shared/models/character/character';
import {BattleTurn} from 'src/app/shared/models/battle/battle';

const prefix = '[Battle]';

export const BattleActions = {
  OpenNewBattle: createAction(`${prefix} New Battle`),
  NewBattle: createAction(`${prefix} New Battle Ready`, props<{ turn: BattleTurn }>()),
  StartBattle: createAction(`${prefix} StartBattle`),
  EndBattle: createAction(`${prefix} End Battle`),

  PreviousTurn: createAction(`${prefix} Previous Turn`),
  NextTurn: createAction(`${prefix} Next Turn`),
  NextTurnReady: createAction(`${prefix} Next Turn ready`,  props<{ turn: BattleTurn }>()),

  OpenAddCharacter: createAction(`${prefix} Open Add Character`),
  AddCharacter: createAction(`${prefix} Add Character`, props<{ character: Character }>()),
  EditCharacter: createAction(`${prefix} Add Character`, props<{ character: Character }>()),
  RemoveCharacter: createAction(`${prefix} Remove Character`, props<{ id: number }>()),
};

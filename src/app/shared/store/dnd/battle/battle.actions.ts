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
  PreviousTurnReady: createAction(`${prefix} Previous Turn Ready`),

  NextTurn: createAction(`${prefix} Next Turn`),
  NextTurnReady: createAction(`${prefix} Next Turn ready`, props<{ turn: BattleTurn }>()),

  OpenAddCharacters: createAction(`${prefix} Open Add Characters`),
  AddCharacters: createAction(`${prefix} Add Characters`, props<{ characters: BattleCharacter[] }>()),
  CharactersAdded: createAction(`${prefix} Characters Added`),

  EditCharacter: createAction(`${prefix} Edit Character`, props<{ id: number; modification: any }>()),
  CharacterEdited: createAction(`${prefix} Character Edited`),

  RemoveCharacter: createAction(`${prefix} Remove Character`, props<{ id: number }>()),
  CharacterRemoved: createAction(`${prefix} Character Removed`),

  SyncMap: createAction(`${prefix} Sync Map`),
};

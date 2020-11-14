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

  ChangeBasemap: createAction(`${prefix} Change Basemap`, props<{ basemap: string }>()),
  BasemapChanged: createAction(`${prefix} Basemap Changed`),

  NewEnv: createAction(`${prefix} New Env`, props<{ environment: any }>()),
  EnvRenewed: createAction(`${prefix} Env Renewed`),

  AddFeature: createAction(`${prefix} Add Feature`),
  FeatureAdded: createAction(`${prefix} Feature Added`),

  EditFeature: createAction(`${prefix} Edit Feature`),
  FeatureEdited: createAction(`${prefix} Feature Edited`),

  RemoveFeature: createAction(`${prefix} Remove Feature`),
  FeatureRemoved: createAction(`${prefix} Feature Removed`),

  SyncMap: createAction(`${prefix} Sync Map`),
};

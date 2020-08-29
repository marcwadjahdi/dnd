import {Map as OlMap} from 'ol/Map';

export const BATTLE_MAP_FEATURE = 'battle_map';

export interface BattleMapState {
  map: OlMap;
}

export interface HeroPartialState {
  [BATTLE_MAP_FEATURE]: BattleMapState;
}


import {Character} from '../character/character.model';
import {Identified} from '../common/identified';
import {Timed} from '../common/timed';
import {Coordinate} from 'ol/coordinate';
import GeometryType from 'ol/geom/GeometryType';

export interface Battle extends Identified, Timed {
  currentTurn?: BattleTurn;
  turns?: { [id: number]: BattleTurn };
}

export interface EnvironmentItem {
  type: GeometryType;
  data?: any;
}

export interface BattleTurn extends Identified, Timed {
  basemap?: string;
  environment?: EnvironmentItem[];
  initiative?: number[];
  active?: number;
  characters?: { [id: number]: BattleCharacter };
}

export interface BattleCharacter extends Character {
  active?: boolean;
  initiative?: number;
  position?: Coordinate;
}


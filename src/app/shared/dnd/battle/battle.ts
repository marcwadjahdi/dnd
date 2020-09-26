import {Character} from '../character/character.model';
import {Identified} from '../common/identified';
import {Timed} from '../common/timed';
import {Coordinate} from 'ol/coordinate';
import {Geometry} from 'ol/geom';

export interface Battle extends Identified, Timed {
  currentTurn?: BattleTurn;
  turns?: { [id: number]: BattleTurn };
}

export interface BattleTurn extends Identified, Timed {
  basemap?: string;
  environment?: Geometry[];
  initiative?: number[];
  active?: number;
  characters?: { [id: number]: BattleCharacter };
}

export interface BattleCharacter extends Character {
  active?: boolean;
  initiative?: number;
  position?: Coordinate;
}


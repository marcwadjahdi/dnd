import {Battle} from 'src/app/shared/dnd/battle/battle';

export const BattleFeature = 'Battle';

export interface BattleState {
  active: Battle;
  archived: Battle[];
}


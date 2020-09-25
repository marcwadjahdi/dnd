import {Battle} from 'src/app/shared/models/battle/battle';

export const BattleFeature = 'Battle';

export interface BattleState {
  active: Battle;
  archived: Battle[];
}


import {PcState} from 'src/app/shared/store/dnd/character/player/pc.state';
import {NpcState} from './dnd/character/npc/npc.state';
import {BattleState} from './dnd/battle/battle.state';

export interface DndState extends PcState, NpcState, BattleState {
}

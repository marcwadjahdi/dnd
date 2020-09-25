import {createFeatureSelector, createSelector} from '@ngrx/store';
import {NpcAdapter, NpcFeature, NpcState} from './npc.state';

const selectState = createFeatureSelector<NpcState>(NpcFeature);
const {selectAll} = NpcAdapter.getSelectors(selectState);

const selectFilters = createSelector(selectState, state => state.filters);

const NPCs = createSelector(selectAll, selectFilters, (entities, filters) => {
  let data = [...entities];
  if (null !== filters.hostile && undefined !== filters.hostile) {
    data = data.filter(it => it.hostile === filters.hostile);
  }
  if (filters.name && filters.name.length > 2) {
    const name = filters.name.toLowerCase();
    data = data.filter(it => it.name.toLowerCase().match(`/.*${name}.*/`));
  }
  return data;
});
const NPC = createSelector(selectState, state => state.npc);

export const NpcSelectors = {
  NPCs,
  NPC,
};

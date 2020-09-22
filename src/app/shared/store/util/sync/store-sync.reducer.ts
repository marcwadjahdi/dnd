import {StoredState} from './store-sync.service';
import {INIT, MetaReducer} from '@ngrx/store';
import {StoreSyncUpdateAction} from './store-sync.actions';

function StoreSyncMetaReducer(reducer) {
  return (state, action) => {
    let newState = state;
    if (action.type === INIT || action.type === StoreSyncUpdateAction.type) {
      newState = StoredState() || state;
    }
    return reducer(newState, action);
  };
}

export const metaReducers: MetaReducer[] = [StoreSyncMetaReducer];

import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RouterReducerState} from '@ngrx/router-store';
import {ClikRouterState, ROUTER_FEATURE_NAME} from './router.state';

const selectRouterReducerState = createFeatureSelector<RouterReducerState<ClikRouterState>>(ROUTER_FEATURE_NAME);

const selectRouteState = createSelector(selectRouterReducerState, state => state.state);

export const RouterSelectors = {
  selectRouterReducerState,
  selectRouteState
};

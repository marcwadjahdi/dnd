import {Params} from '@angular/router';
import {RouterReducerState} from '@ngrx/router-store';

export interface RouterState {
  url: string;
  params: Params;
  queryParams: Params;
}

export const ROUTER_FEATURE_NAME = 'router';

export interface RouterPartialState {
  readonly [ROUTER_FEATURE_NAME]: RouterReducerState<RouterState>;
}

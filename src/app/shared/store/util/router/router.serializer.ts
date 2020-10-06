import {RouterStateSnapshot} from '@angular/router';
import {RouterStateSerializer} from '@ngrx/router-store';
import {ClikRouterState} from './router.state';

export class CustomRouterSerializer implements RouterStateSerializer<ClikRouterState> {
  serialize(routerState: RouterStateSnapshot): ClikRouterState {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {url, root: {queryParams}} = routerState;
    const {params} = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return {url, params, queryParams};
  }
}

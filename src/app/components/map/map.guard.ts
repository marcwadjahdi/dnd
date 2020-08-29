import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import {MapFacade} from '../../shared/dnd/map';

// other imports

@Injectable({
  providedIn: 'root'
})
export class MapGuard implements CanActivate {
  constructor(private facade: MapFacade) {
}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const { fundId } = route.params;
    return of(true);
    // return this.getFund(fundId).pipe(
    //   switchMap(() => of(true)),
    //   catchError(() => of(false))
    // );
  }
  //
  // private getFund(fundId: string) {
  //   return this.facade.fundDetails$.pipe(
  //     tap(data => this.prefetch(data)),
  //     filter(data => !!data),
  //     take(1)
  //   );
  // }
  //
  // private prefetch(fund: FundDetails) {
  //   if (!fund) {
  //     this.facade.loadFunds();
  //   }
  // }
}

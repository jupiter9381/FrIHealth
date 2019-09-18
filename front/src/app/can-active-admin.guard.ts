import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActiveAdmin implements CanActivate {
  constructor(private router: Router) {
    //
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    const role = localStorage.getItem('role');

    const canActive = !!role &&
      role === 'admin' &&
      (state.url.startsWith('/medical-conditions') || state.url.startsWith('/menus'));

    if (!canActive) {
      this.router.navigate(['/login']);
    }
    return canActive;
  }
}

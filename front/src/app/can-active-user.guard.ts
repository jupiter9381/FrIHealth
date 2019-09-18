import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActiveUser implements CanActivate {
  constructor(private router: Router) {
    //
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    const role = localStorage.getItem('role');
    const canActive = !!role &&
      role === 'user'
      && (state.url.startsWith('/collection') || state.url.startsWith('/search') || state.url.startsWith('/menu/'));

    if (!canActive) {
      this.router.navigate(['/login']);
    }
    return canActive;
  }
}

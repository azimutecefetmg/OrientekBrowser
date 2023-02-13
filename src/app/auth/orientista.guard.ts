import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, CanActivateChild, Route, Router} from '@angular/router';
import {AuthOrientistaService} from './auth-orientista.service';
import {isCombinedNodeFlagSet} from 'tslint';

@Injectable({
  providedIn: 'root'
})
export class OrientistaGuard implements CanActivate, CanLoad, CanActivateChild {

  constructor(private authService: AuthOrientistaService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('%ccanActivate', 'color:purple');
    const url = state.url;
    return this.checkLogin(url);
  }


  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('%ccanActivateChild', 'color:purple');
    const url = state.url;
    return this.checkLogin(url);
  }

  canLoad(route: Route): boolean {
    console.log('%ccanLoad', 'color:purple');
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isAuthenticated()) {
      console.log('%cCheck Login', 'font-size:1.7rem; font-weight:900;color:green');
      return true;
    } else {
      // Store the attempted URL for redirecting
      this.authService.redirectUrl = url;
      // Navigate to the login page with extras
      this.router.navigate(['auth/orientista/login']);
      return false;
    }
  }
}

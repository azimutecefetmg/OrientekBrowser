import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
  Route,
  CanLoad,
} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthClubesGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('canActivate');
    const url = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('canActivateChild');
    const url = state.url;
    return this.checkLogin(url);
  }

  canLoad(route: Route): boolean {
    console.log('canLoad');
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isAuthenticaded(url)) {
      console.log('%cCheck Login', 'font-size:1.7rem; font-weight:900;color:green');
      return true;
    } else {
      // Store the attempted URL for redirecting
      this.authService.redirectUrl = url;
      // Navigate to the login page with extras
      this.router.navigate(['auth/clube/login']);
      return false;
    }
  }
}

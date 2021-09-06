import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {LoginService} from "../login/login.service";
import {Observable} from "rxjs";
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthgardService implements CanActivate{

  constructor(private loginService: LoginService,
              private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.loginService.isLoggedIn()) {
      console.log(this.loginService.isLoggedIn())
      return true;
    }
    else {
      this.loginService.logout();
      this.router.navigate(['/pages/login']);
      return false;
    }
  }
}

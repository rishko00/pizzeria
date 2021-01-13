import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from './auth.service';
import { Injectable } from  '@angular/core';

@Injectable({
    providedIn:  'root'
})

export class AdminGuard implements CanActivate{
  constructor(public auth: AuthService){};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
    return this.auth.isLoggedIn;
  }
}
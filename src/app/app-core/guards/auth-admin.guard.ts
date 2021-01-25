import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from '../../app-core/services/auth.service';

export interface ComponentCanDeactivate{
  canDeactivate: () => boolean | Observable<boolean>;
}

export class AuthGuard implements CanDeactivate<ComponentCanDeactivate> {
  constructor(public auth: AuthService){};

  canDeactivate(component: ComponentCanDeactivate) : Observable<boolean> | boolean{
    return !this.auth.isLoggedIn;
  }
}
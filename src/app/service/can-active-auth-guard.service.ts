import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CanActiveAuthGuardService {
  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authenticationService.tokenIsPresent()) {
      return true;
    } else {
      return false;
    }
  }
}

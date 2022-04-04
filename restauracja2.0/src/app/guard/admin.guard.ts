import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth : AuthenticationService,
              public router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.auth.isLoggedIn){
      alert("Nawet zalogowany nie jesteś")
      this.router.navigate(['login'])
    }
    else {
      const admin = JSON.parse(localStorage.getItem("roles")!).admin!
      if(!admin){
        alert("Nie jesteś adminem kolego")
        this.router.navigate(['home'])
      }
    }
    return true
  }

}

import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {AlertifyService} from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  constructor(private authService: AuthService, private alertifyService: AlertifyService, private router: Router){
  }
  canActivate(): boolean{
    if(this.authService.isLoggedIn()){
      return true;
    }

    this.alertifyService.error('Login to view this page');
    this.router.navigate(['welcome']);
    return false;
  }
}

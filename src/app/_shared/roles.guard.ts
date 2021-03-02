import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {AlertifyService} from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
  constructor(private authService: AuthService, private alertifyService: AlertifyService, private router: Router) {{
  }
  }
  canActivate(): boolean{
    if(this.authService.isLoggedIn() && this.authService.isAdmin()){
      return  true;
    }
    this.alertifyService.error ('This view is for admins only please');
    this.router.navigate(['my-home']);
    return false;
  }

}

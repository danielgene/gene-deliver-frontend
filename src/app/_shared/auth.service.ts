import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Token} from '../_models/token';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  token: Token;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(private http: HttpClient, private router: Router) { }
  isLoggedIn(){
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  isAdmin(){
    const accountType = localStorage.getItem('accountType');
    if(accountType!= null && (accountType=='super' || accountType=='admin')){
      return true
    }
    return false;
  }
  isAgent(){

  }
  userType(){
    const accountType = localStorage.getItem('accountType');
    if(accountType == "super"){
      return 1;
    }
    if(accountType =="driver"){
      return 2;
    }
    if(accountType =="agent"){
      return 3;
    }
    if(accountType == "admin"){
      return  4;
    }
  }
  logout(){
    console.log('Logging out');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

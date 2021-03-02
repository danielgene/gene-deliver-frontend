import {Component, OnInit} from '@angular/core';
import {AuthService} from './_shared/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import localizeExtractLoader from '@angular-devkit/build-angular/src/extract-i18n/ivy-extract-loader';
import {AlertifyService} from './_shared/alertify.service';
import {RestService} from "./_shared/rest.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'gene-deliver-angular';
  jwtHelper = new JwtHelperService();
  tokenExpiration: Date;
  constructor(private authService: AuthService,private restService: RestService, private router: Router, private alertifyService: AlertifyService) {
  }

  ngOnInit() {
    this.testAuth();
    if(this.authService.isLoggedIn()){
      //this.restService.startPreloading();
    }

  }

  isAdmin(){
    return this.authService.isAdmin();
  }

  testToken(){
    const token = localStorage.getItem('token');
    if(token === null){
      // redirect to login page
      console.log('There is no token');
      this.router.navigate(['/login']);
    }
    else{
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.tokenExpiration = new Date(localStorage.getItem('expiration'));
      console.log('Token is available and expires ' + this.tokenExpiration)
      let currentDate = new Date();
      if(currentDate < this.tokenExpiration){
        console.log('Token is still valid');
        this.router.navigate(['/delivery']);
      }
      else{
        console.log('token has expired');
      }
    }
  }

  testAuth(){
    const token = localStorage.getItem('token');
    if(token === null){
      console.log('No token found');
      this.router.navigate(['/login']);
    }
    else{
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.tokenExpiration = new Date(localStorage.getItem('expiration'));
      let currentDate = new Date();
      if(currentDate < this.tokenExpiration){
        // if(this.authService.isAdmin()){
        //   this.router.navigate(['/delivery']);
        // }
        // else{
        //
        // }
        let accountType = this.authService.userType();
        if (accountType == 1){
          this.router.navigate(['/deliveries-overview']);
        }
        if (accountType ==2){
          this.router.navigate(['/delivery'])
        }
        if (accountType == 3){
          this.router.navigate(['agent-home']);
        }
      }
      else{
        this.alertifyService.warning('Please login to continue');
        this.authService.logout();
      }
    }
  }
}

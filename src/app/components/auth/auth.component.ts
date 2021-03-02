import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../_shared/auth.service';
import {AlertifyService} from '../../_shared/alertify.service';
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Token} from "../../_models/token";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  model: any = {};
  token: Token;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private alertify: AlertifyService,
              private  activatedRoute:ActivatedRoute,
              private router: Router) {  }

  @ViewChild('loginForm') loginForm;

  ngOnInit() {
  }

  login() {
    console.log(this.model);

    this.doLogin(this.model).subscribe(next => {

    }, error => {
      console.log('Failed to login');
      this.loginForm.reset();
      console.log(error);
      this.alertify.error("Login failed please try again");
    })
  }

  doLogin(model: any) {
    console.log(model);
    return this.http.post(this.authService.baseUrl + 'auth/login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          console.log(response);
          this.token = response;
          localStorage.clear();
          //console.log('The token is: ' + this.token.token);
          localStorage.setItem('token', this.token.token);
          localStorage.setItem('expiration', this.token.expiration.toString());
          localStorage.setItem('accountType', this.token.accountType);
          localStorage.setItem('userId', this.token.userId);

          // if (this.authService.isAdmin()) {
          //   this.alertify.success("Welcome admin");
          //   this.router.navigate(['/welcome']);
          // }
          // else {
          //   this.alertify.success('Welcome Driver');
          //   this.router.navigate(['/mydeliveries'],{relativeTo:this.activatedRoute});
          // }
          let accountRole = this.authService.userType();
          if(accountRole == 1 || accountRole == 4){
            this.alertify.success("Welcome admin");
            this.router.navigate(['/welcome']);
          }
          if(accountRole == 2){
            this.alertify.success('Welcome Driver');
            this.router.navigate(['/mydeliveries'],{relativeTo:this.activatedRoute});
          }
          if(accountRole == 3){
            this.alertify.success('Welcome Agent');
            this.router.navigate(['/agent-home'], {relativeTo:this.activatedRoute});
          }
        })
      )
  }


}

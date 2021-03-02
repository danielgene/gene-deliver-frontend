import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../_shared/auth.service';
import {AlertifyService} from '../../_shared/alertify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
  }
  isAdminAccont(){
    return this.authService.isAdmin();
  }
  logout(){
    return  this.authService.logout();
  }
  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}

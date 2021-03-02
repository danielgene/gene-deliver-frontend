import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../_shared/auth.service";
import {RestService} from "../../../_shared/rest.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  userType: number;
  constructor(private authService:AuthService,private restService:RestService) { }

  ngOnInit(): void {
    this.getUserType();
  }
  isAdmin(){
    return this.authService.isAdmin();
  }

  getUserType(): number{
    return this.authService.userType();
  }

}

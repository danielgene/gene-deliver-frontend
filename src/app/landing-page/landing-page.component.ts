import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
        this.router.navigate(['/']);



    }else{
      this.router.navigate(['/login']);

    }
  }

}

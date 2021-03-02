import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_shared/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RestService} from "../_shared/rest.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  accountType: number = null;
  isLoading: boolean = false;

  constructor(private  authService: AuthService,
              private restService: RestService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  async preloadData() {
    await this.restService.startPreloading();
  }

  async ngOnInit() {
    if (this.restService.deliveryViews.length === 0) {
      await this.restService.startPreloading();
    }

    if (this.accountType == 1 || this.accountType == 4) {
      this.router.navigate(['deliveries-overview'], {relativeTo: this.activatedRoute});
    }
    if (this.accountType == 2) {
      this.router.navigate(['deliveries-overview'], {relativeTo: this.activatedRoute});
    }
    if (this.accountType == 3) {
      this.router.navigate(['agent-home'], {relativeTo: this.activatedRoute});
    }

  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  getAccountType() {
    this.accountType = this.authService.userType();
  }

}

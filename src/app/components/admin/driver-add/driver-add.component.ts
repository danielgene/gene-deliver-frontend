import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../_shared/rest.service';
import {AlertifyService} from '../../../_shared/alertify.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-driver-add',
  templateUrl: './driver-add.component.html',
  styleUrls: ['./driver-add.component.css']
})
export class DriverAddComponent implements OnInit {
  driver: any = {};
  constructor(private restService: RestService, private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit() {
  }
  addDriver(){
    console.log(this.driver);
    this.restService.addDriver(this.driver).subscribe((dr => {
      console.log(dr);
      this.alertifyService.success('Driver created');
      this.router.navigate(['/drivers']);
    }), error => {
      this.alertifyService.error('Error creating driver try again');
      this.router.navigate(['/drivers']);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../_shared/rest.service';
import {AlertifyService} from '../../../_shared/alertify.service';
import {UserView} from '../../../_models/userView';
import {DriverSwapDto} from '../../../_models/driver-swap-dto';
import {Route} from '@angular/router';

@Component({
  selector: 'app-driver-swap',
  templateUrl: './driver-swap.component.html',
  styleUrls: ['./driver-swap.component.css']
})
export class DriverSwapComponent implements OnInit {
  activeDrivers: UserView[] = [];
  driver1: string;
  driver2: string;
  constructor(private restService: RestService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.getActiveDrivers();
  }
  getActiveDrivers(){
    this.restService.getActiveDrivers().subscribe((response => {
      this.activeDrivers = response;

    }), error => {
      this.alertifyService.error('Error getting Active Drivers');
    })
  }
  swapDriver(){
    if(this.driver1 == this.driver2){
      this.alertifyService.error('Select different drivers');
    }
    else{
      let data = {
        "driver1ID": this.driver1,
        "driver2ID": this.driver2
      };
      console.log(data);
      this.restService.swapDrivers(data).subscribe((response => {
        this.alertifyService.success('Drivers have been swapped');

      }), error => {
        this.alertifyService.error('Error swapping drivers');
      })
    }
  }
}

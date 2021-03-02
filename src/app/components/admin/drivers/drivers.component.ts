import { Component, OnInit } from '@angular/core';
import {UserView} from '../../../_models/userView';
import {RestService} from '../../../_shared/rest.service';
import {AlertifyService} from '../../../_shared/alertify.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  allDrivers: UserView[] = [];
  allAgents: UserView[] = [];
  constructor(private restService: RestService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.getAllDrivers();
    this.getAgents();
  }
  getAllDrivers(){
    this.restService.getDrivers().subscribe((response => {
      this.allDrivers = response;
      console.log(response);
      this.alertifyService.message('Driver Loaded');
    }))
  }
  getAgents(){
    this.restService.getAgents().subscribe(response => {
      this.allAgents = response;
    }, error => {
      this.alertifyService.error('Error Getting Agents');
    })
  }

}

import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../_shared/rest.service';
import {UserView} from '../../../../_models/userView';
import {Zone} from '../../../../_models/zone';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-assign-zone',
  templateUrl: './assign-zone.component.html',
  styleUrls: ['./assign-zone.component.css']
})
export class AssignZoneComponent implements OnInit {
  drivers: UserView[];
  zones: Zone[];
  assignModel: any;
  constructor(private restService: RestService) { }
  ngOnInit(): void {
    this.getEmpty();
  }
  getEmpty(){
    this.restService.getDriverWithNoZones().subscribe((response =>{
      this.drivers = response;
      console.log(this.drivers);
    }));
    this.restService.getZoneWithNoDrivers().subscribe((response =>{
      this.zones = response;
      console.log(this.zones);
    }));
  }
  assign(form:NgForm){
    console.log(form.value);
    console.log(this.assignModel);

  }

}

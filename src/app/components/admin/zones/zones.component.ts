import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../_shared/rest.service';
import {AlertifyService} from '../../../_shared/alertify.service';
import {Zone} from '../../../_models/zone';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {
  zones: Zone[];
  constructor(private restService: RestService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.getZones();
  }
  getZones(){
    this.restService.getZones().subscribe((zone =>{
      this.zones = zone;
      console.log(zone);
    }))
  }

}

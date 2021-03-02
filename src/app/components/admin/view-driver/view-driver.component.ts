import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../../_shared/rest.service';
import {UserView} from '../../../_models/userView';
import {Zone} from '../../../_models/zone';
import {AlertifyService} from '../../../_shared/alertify.service';
import {ZoneArea} from '../../../_models/zone-area';
import {ZoneOwner} from '../../../_models/zone-owner';

@Component({
  selector: 'app-view-driver',
  templateUrl: './view-driver.component.html',
  styleUrls: ['./view-driver.component.css']
})
export class ViewDriverComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private restService: RestService, private router: Router, private alertifyService: AlertifyService) {

  }
  driverId: string;
  driver: UserView;
  zones: Zone[];
  currentZone: string;
  zoneOwner: ZoneOwner;

  ngOnInit() {
    this.driverId = this.activatedRoute.snapshot.params['id'];
    this.restService.getDriver(this.driverId).subscribe(driver => {
      this.driver = driver;
    });
    if (this.driver.accountType == "driver"){
      this.restService.getZoneWithNoDrivers().subscribe((response => {
        this.zones = response;
        console.log(this.zones);
      }));
      this.getDriverZone();
    }
  }

  setActiveZone(currentZone) {
    this.currentZone = currentZone.target.value;
    console.log(this.currentZone);
  }

  getDriverZone(){
    this.restService.getDriverZone(this.driverId).subscribe((resposne => {
      this.zoneOwner = resposne;
      console.log(this.zoneOwner);

    }), error => {
      this.alertifyService.error('Error getting the driver zone');
    })
  }
  assignDriver(){
    let data = {
      "driverId":this.driverId,
      "zoneID":this.currentZone,
    }
    console.log(data);
    this.restService.assignZone(data).subscribe((resp =>{
      console.log(resp);
      this.alertifyService.success('Driver has been allocated a zone');
      this.router.navigate(['drivers']);
      // this.router.navigate(['view-driver/:id'])
    }), error =>{
      this.alertifyService.error('Problem allocationg a zone, please try again');
    })
  }

}

import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../_shared/rest.service';
import {AlertifyService} from '../../../../_shared/alertify.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.css']
})
export class AddZoneComponent implements OnInit {
  model: any = {};
  constructor(private restService: RestService, private alertifyService: AlertifyService, private router: Router) { }
  ngOnInit() {
  }
  addZone(){
    console.log(this.model);
    this.restService.addZone(this.model).subscribe((zone =>{
      console.log('zone');
      this.alertifyService.success('New Zone Added ');
      this.router.navigate(['/zones'])
    }), error => {
      this.alertifyService.error('Error Adding a new zone');
      this.router.navigate(['/zones']);
    })
  }
}

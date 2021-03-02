import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../_shared/rest.service';
import {AlertifyService} from '../../../_shared/alertify.service';
import {Delivery} from '../../../_models/delivery';

@Component({
  selector: 'app-incomplete-delivery',
  templateUrl: './incomplete-delivery.component.html',
  styleUrls: ['./incomplete-delivery.component.css']
})
export class IncompleteDeliveryComponent implements OnInit {
  allDeliveries: Delivery[];
  constructor(private restService: RestService, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
    this.getMyIncomplete();
  }
  getMyIncomplete(){
    this.restService.getMyIncomplete().subscribe((response => {
      this.allDeliveries = response;
      console.log('Incomplete');
    }), error => {
      this.alertifyService.error('Error getting your incomplete jobs');
    })
  }

}

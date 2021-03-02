import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../_shared/rest.service';
import {AlertifyService} from '../../../_shared/alertify.service';
import {Delivery} from '../../../_models/delivery';

@Component({
  selector: 'app-complete-delivery',
  templateUrl: './complete-delivery.component.html',
  styleUrls: ['./complete-delivery.component.css']
})
export class CompleteDeliveryComponent implements OnInit {
  allDeliveries: Delivery[];
  constructor(private restService: RestService, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
    this.getMyComplete();
  }
  getMyComplete(){
    this.restService.getMyComplete().subscribe((response => {
      this.allDeliveries = response;
    }), error =>{
      this.alertifyService.error('Error getting your completed Service');
    })
  }

}

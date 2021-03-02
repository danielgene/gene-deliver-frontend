import { Component, OnInit } from '@angular/core';
import {RestService} from '../../_shared/rest.service';
import {AlertifyService} from '../../_shared/alertify.service';
import {LostDelivery} from '../../_models/lost-delivery';

@Component({
  selector: 'app-lost-delivery',
  templateUrl: './lost-delivery.component.html',
  styleUrls: ['./lost-delivery.component.css']
})
export class LostDeliveryComponent implements OnInit {
  lostDeliveries: LostDelivery[];
  constructor(private restService: RestService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.getLostDeliveries();
  }
  getLostDeliveries(){
    this.restService.getLostDeliveries().subscribe((delivery  =>{
      this.lostDeliveries = delivery;
      console.log(this.lostDeliveries)
    }));

  }

}

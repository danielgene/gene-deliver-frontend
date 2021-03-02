import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../_shared/rest.service';
import {Delivery} from '../../../_models/delivery';
import {AlertifyService} from '../../../_shared/alertify.service';

@Component({
  selector: 'app-my-deliveries',
  templateUrl: './my-deliveries.component.html',
  styleUrls: ['./my-deliveries.component.css']
})
export class MyDeliveriesComponent implements OnInit {
  allDeliveries: Delivery[];
  constructor(private restService: RestService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.getAllMyDeliveries();

  }
  getAllMyDeliveries(){
    this.restService.getMyDeliveries().subscribe((deliveries: Delivery[]) =>{
      this.allDeliveries = deliveries;
      console.log(this.allDeliveries);

    }, error =>{

    })
  }


}

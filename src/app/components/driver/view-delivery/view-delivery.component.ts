import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../../_shared/rest.service';
import {AlertifyService} from '../../../_shared/alertify.service';
import {Delivery} from '../../../_models/delivery';
import {DeliveryComment} from '../../../_models/delivery-comment';

@Component({
  selector: 'app-view-delivery',
  templateUrl: './view-delivery.component.html',
  styleUrls: ['./view-delivery.component.css']
})
export class ViewDeliveryComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private restService: RestService, private route: Router, private alertifyService: AlertifyService) { }
  deliveryID : number;
  model: any = {};
  delivery: Delivery;
  deliveryComments: DeliveryComment[] = [];
  ngOnInit() {
    this.deliveryID = + this.activatedRoute.snapshot.params['id'];
    console.log(this.deliveryID);
    this.getDelivery();
    this.getDeliveryComments();
  }
  getDelivery(){
    this.restService.getDelivery(this.deliveryID).subscribe((response =>{
      this.delivery = response;
      console.log(this.delivery);
    }), error => {
      this.alertifyService.error('Error getting the driver');
    })
  }
  startDelivery(){
    this.restService.startDelivery(this.deliveryID).subscribe((response => {
      this.alertifyService.success('Delivery has started !!!!');
      // refresh the page here
      this.route.navigate(['incomplete']);

    }), error => {
      this.alertifyService.error('Error Starting the Delivery');
    })
  }
  stopDelivery(){
    this.restService.stopDelivery(this.deliveryID).subscribe((response => {
      this.alertifyService.success('Delivery Complete');
      this.route.navigate(['complete']);
    }), error =>{
      this.alertifyService.error('Error stopping the job');
    })
  }
  postComment(){
    this.model.deliveryId = this.deliveryID;
    console.log(this.model);
    this.restService.addDeliveryComment(this.model).subscribe((response => {
      console.log(response);
      this.alertifyService.success('Comment Added');
      this.route.navigate(['view-delivery' + '/' + this.deliveryID]);
    }), error => {
      this.alertifyService.error('Error adding delivery comment');
    })
  }
  getDeliveryComments(){
    this.restService.getDeliveryComments(this.deliveryID).subscribe((response => {
      this.deliveryComments = response;
    }), error =>{
      this.alertifyService.error('Error getting Delivery Comments');
    })
  }
}

import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../_shared/rest.service';
import {AuthService} from '../../../_shared/auth.service';
import {AlertifyService} from '../../../_shared/alertify.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Delivery} from '../../../_models/delivery';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-delivery',
  templateUrl: './edit-delivery.component.html',
  styleUrls: ['./edit-delivery.component.css']
})
export class EditDeliveryComponent implements OnInit {
  deliveryID: number;
  delivery: Delivery;
  constructor(private restService: RestService, private authService: AuthService, private alertifyService: AlertifyService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.deliveryID = +this.activatedRoute.snapshot.params['id'];
    // console.log(this.deliveryID);
    this.getDelivery();
  }
  getDelivery(){
    this.restService.getDelivery(this.deliveryID).subscribe(response => {
      this.delivery = response;
      console.log(this.delivery);
    }, error => {
      this.alertifyService.error('Error getting delivery');
    })
  }
  editDelivery(form:NgForm){
    this.delivery.id = form.value['id'];
    this.delivery.customerFirstName = form.value['customerFirstName'];
    this.delivery.customerLastName = form.value['customerLastName'];
    this.delivery.addressLine2 = form.value['addressLine2'];
    this.delivery.addressLine1 = form.value['addressLine1'];
    this.delivery.phoneNumber = form.value['phoneNumber'];
    console.log(this.delivery);
    this.restService.updateDelivery(this.delivery).subscribe(response => {
      this.alertifyService.success('Updated');
      this.router.navigate(['deliveries-overview']);
    }, error => {
      this.alertifyService.error('Error');
    });
  }
  markDone(){
    this.restService.markDone(this.delivery.id).subscribe(response =>{
      this.alertifyService.success('Delivery Marked');
      this.router.navigate(['deliveries-overview']);
    }, error => {
      this.alertifyService.error('Error adjusting the delivery')
    })
  }
}

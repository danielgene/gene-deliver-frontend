import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../../_shared/rest.service';
import {LostDelivery} from '../../../_models/lost-delivery';
import {NgForm} from '@angular/forms';
import {AlertifyService} from '../../../_shared/alertify.service';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit {
  lostDelivery: LostDelivery;
  constructor(private activatedRoute: ActivatedRoute, private restService: RestService, private alertifyService: AlertifyService, private route: Router) { }

  ngOnInit(): void {
    this.getLostDelivery();
  }
  getLostDelivery(){
    const id = + this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.restService.getLostDelivery(id).subscribe((response => {
      this.lostDelivery = response;
      console.log(this.lostDelivery);
    }));
  }

  addDelivery(form:NgForm){

    // this.lostDelivery.id = form.value.id;
    this.lostDelivery.id = form.value['id'];
    this.lostDelivery.customerFirstName = form.value['customerFirstName'];
    this.lostDelivery.customerLastName = form.value['customerLastName'];
    this.lostDelivery.customerID = form.value['customerID'];
    this.lostDelivery.addressLine1 = form.value['addressLine1'];
    this.lostDelivery.addressLine2 = form.value['addressLine2'];
    this.lostDelivery.city = form.value['city'];
    this.lostDelivery.phoneNumber = form.value['phoneNumber'];
    this.lostDelivery.policyID = form.value['policyID'];
    this.lostDelivery.policyName = form.value['policyName'];
    this.lostDelivery.policyTransactionDate = form.value['policyTransactionDate'];
    this.lostDelivery.policyAmount = form.value['policyAmount'];
    this.lostDelivery.agentID = form.value['agentID'];
    this.lostDelivery.agentName = form.value['agentName'];
    // this.lostDelivery.city = form.value['city'];
    console.log(this.lostDelivery);
    this.restService.postLostDelivery(this.lostDelivery).subscribe((response => {
      console.log(response);
      this.route.navigate(['lost-delivery']);
      this.alertifyService.success('Delivery has been allocated');
    }), error => {
      this.alertifyService.error('Delivery not assigned to a driver');
    })
  }

}

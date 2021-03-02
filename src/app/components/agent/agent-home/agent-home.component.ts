import {AfterViewInit, Component, OnInit} from '@angular/core';
import {RestService} from '../../../_shared/rest.service';
import {AlertifyService} from '../../../_shared/alertify.service';
import {DeliveryView} from '../../../_models/delivery-view';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.css']
})
export class AgentHomeComponent implements AfterViewInit {
  deliveryView: DeliveryView[];
  completedDeliveries: DeliveryView[];
  incompleteDeliveries: DeliveryView[];

  isLoading:boolean = false;

  constructor(private restService: RestService, private alertifyService: AlertifyService, private httpClient: HttpClient) {
  }

  ngAfterViewInit(): void {
    this.getAllDeliveries();
    // this.getCompleted();
    // this.getIncomplete();
  }

  ngOnInit(): void {

  }

  getAllDeliveries() {
    this.isLoading = true;
    this.httpClient.get<DeliveryView[]>(this.restService.baseUrl + 'deliveries/GetAgentAll', this.restService.httpOptions)
      .subscribe(
        response => {
          this.deliveryView = response;
          this.getCompleted();
        },
        error => {
          this.alertifyService.error('Error getting your deliveries');
          console.log('failed here');
          this.isLoading = false;
        }
      );
  }

  getCompleted() {
    this.httpClient.get<DeliveryView[]>(this.restService.baseUrl + 'deliveries/agentcomplete', this.restService.httpOptions)
      .subscribe(
        response=>{
          this.completedDeliveries = response;
          this.getIncomplete();
        },
        error => {
          this.alertifyService.error('Eerror Getting your completed items');
        }
      );

    // this.restService.getAgentComplete().subscribe(response => {
    //   this.completedDeliveries = response;
    //   console.log(this.completedDeliveries);
    // }, error => {
    //   this.alertifyService.error('Eerror Getting your completed items');
    // })
  }

  getIncomplete() {
     this.httpClient.get<DeliveryView[]>(this.restService.baseUrl + 'deliveries/agentincomplete', this.restService.httpOptions)
       .subscribe(
         response=>{
           this.incompleteDeliveries = response;
           this.isLoading = false;
         },
         error => {
           this.alertifyService.error('Error getting incomplete deliveries');
           this.isLoading = false;
         }
       )

    // this.restService.getAgentIncomplete().subscribe(response => {
    //   this.incompleteDeliveries = response;
    //   console.log(this.incompleteDeliveries);
    // }, error => {
    //   this.alertifyService.error('Error getting incomplete deliveries');
    // })
  }

  showAlert(s) {
    alert(s);
  }
}

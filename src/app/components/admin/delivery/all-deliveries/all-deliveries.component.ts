import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {DeliveryView} from "../../../../_models/delivery-view";
import {RestService} from "../../../../_shared/rest.service";
import {AlertifyService} from "../../../../_shared/alertify.service";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-all-deliveries',
  templateUrl: './all-deliveries.component.html',
  styleUrls: ['./all-deliveries.component.css']
})
export class AllDeliveriesComponent implements AfterViewInit {

  constructor(private restService: RestService, private alertifyService: AlertifyService, private httpClient: HttpClient) {

  }

  @Input('displayedColumns') displayedColumns: string[];
  allDeliveriesDataSource: any;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  isLoading: boolean = false;

  deliveryView

  ngOnInit() {

  }



  getDeliveryViews() {
    this.isLoading = true;
    this.restService.getDeliveryView().subscribe(response => {
      this.deliveryView = response;
      this.isLoading = false;
      this.allDeliveriesDataSource = new MatTableDataSource<DeliveryView>(response);
      console.log('delivery views are here');
    }, error => {
      this.isLoading = false;
      this.alertifyService.error('Error getting delivery view ');
    })
  }

  ngAfterViewInit() {
    this.getDeliveryViews();
  }

  showAlert(s) {
    alert(s);
  }


}

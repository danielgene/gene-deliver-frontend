import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../_shared/rest.service';
import {AlertifyService} from '../../../_shared/alertify.service';
import {Delivery} from '../../../_models/delivery';
import {AuthService} from '../../../_shared/auth.service';
import {ExcelService} from '../../../_shared/excel.service';
import {DeliveryComment} from '../../../_models/delivery-comment';
import {DeliveryView} from '../../../_models/delivery-view';
import {UserView} from '../../../_models/userView';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {forEach} from "ag-grid-community/dist/lib/utils/array";


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  // allDeliveries: Delivery[];
  completedDeliveries = this.restService.completeDeliveryViews;
  incompleteDeliveries=this.restService.incompleteDeliveryViews;
  notStarted =this.restService.notStartedViews;
  inProgress = this.restService.inProgress;
  // deliveryComments: DeliveryComment [];

  deliveryView: DeliveryView[] = [];

  isAdmin:boolean = this.authService.isAdmin();

  displayedColumns: string[] = ['customerFirstName','customerLastName', 'policyTransactionDate', 'policyAmount', 'Agent Name', 'address', 'startTime', 'endTime', "Status", "driver", "duration", 'comments','actions'];

  reportResult: DeliveryView[];

  drivers: UserView[];
  model: any = {};
  reportCount: number = 0;

  allDeliveriesDataSource = new MatTableDataSource<DeliveryView>(this.restService.deliveryViews);
  completedDeliveryDataSource = new MatTableDataSource<DeliveryView>(this.restService.completeDeliveryViews);

  constructor(private restService: RestService, private alertifyService: AlertifyService, private authService: AuthService,
              private excelService: ExcelService) {
    console.log('constructor');
    this.deliveryView = this.restService.deliveryViews;
  }


  showAlert(s) {
    alert(s);
  }

  ngOnInit() {
    console.log('on init');
    this.getDrivers();
  }

  getCompletedDeliveries() {
    this.restService.getCompletedDeliveries().subscribe((delivery: DeliveryView[]) => {
      this.completedDeliveries = delivery;

    }, error => {
      console.log(error);
      this.alertifyService.error(error);
    });
  }

  getInProgressDeliveries() {
    this.restService.getInProgressDeliveries().subscribe(response => {
      this.inProgress = response;

    }, error => {
      this.alertifyService.error('Error loading the in prgress deliveries');
    })
  }

  getInIncompleteDeliveries() {
    this.restService.getIncompleteDeliveries().subscribe((delivery: DeliveryView[]) => {
      this.incompleteDeliveries = delivery;
      //console.log(this.incompleteDeliveries);
    }, error => {
      console.log(error);
      this.alertifyService.error(error);
    });
  }

  getNotStarted() {
    this.restService.getNotStarted().subscribe((delivery: DeliveryView[]) => {
      this.notStarted = delivery;
      // console.log(this.notStarted);
    }, error => {
      this.alertifyService.error('Error getting the unstarted deliveries');
    })
  }

  getDeliveryViews() {
    this.restService.getDeliveryView().subscribe(response => {
      this.deliveryView = response;
      this.allDeliveriesDataSource = new MatTableDataSource<DeliveryView>(response);
      console.log('delivery views are here');
    }, error => {
      this.alertifyService.error('Error getting delivery view ');
    })
  }

  getDrivers() {
    this.restService.getActiveDrivers().subscribe(response => {
      this.drivers = response;
      console.log(response);
    }, error => {
      this.alertifyService.error('Error getting the drivers');
    })
  }

  // exportAllDeliveries(){
  //   this.excelService.exportAsExcelFile(this.allDeliveries, 'AllDeliveries');
  // }
  exportViewDeliveries() {
    this.excelService.exportAsExcelFile(this.deliveryView, 'View Deliveries');
  }

  exportNotStartedDeliveries() {
    this.excelService.exportAsExcelFile(this.notStarted, 'Not Started Deliveries');
  }

  exportComplete() {
    this.excelService.exportAsExcelFile(this.completedDeliveries, 'Complete Deliveries');
  }

  exportInProgress() {
    this.excelService.exportAsExcelFile(this.inProgress, 'Incomplete Deliveries');
  }


  sendReport() {
    console.log(this.model);
    this.restService.getReport(this.model).subscribe(response => {
      this.reportResult = response;
      //console.log(response);
      this.reportCount = response.length;
      //console.log(this.reportCount);
    }, error => {
      this.alertifyService.error('Error generating the report');
    });
  }
}

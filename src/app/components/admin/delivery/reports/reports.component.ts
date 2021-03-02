import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AlertifyService} from "../../../../_shared/alertify.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DeliveryView} from "../../../../_models/delivery-view";
import {catchError} from "rxjs/operators";
import {RestService} from "../../../../_shared/rest.service";
import {ExcelService} from "../../../../_shared/excel.service";
import {MatTableDataSource} from "@angular/material/table";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @Input('drivers') drivers;
  driverId: string = 'Select Driver';
  deliveryStatus = 1;
  isLoading: boolean = false;
  reportResult: DeliveryView[] = [];

  constructor(private alertifyService: AlertifyService,
              private http: HttpClient,
              private restService: RestService,
              private excelService: ExcelService,
              private httpClient: HttpClient) {

  }

  httpPostOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  exportReport() {
    this.excelService.exportAsExcelFile(this.reportResult, 'Report Extraction');
  }

  showAlert(s) {
    alert(s);
  }


  getDailyDeliveryViews() {
    this.isLoading = true;
    this.httpClient.get<DeliveryView[]>(this.restService.baseUrl + "deliveries/daily-report", this.restService.httpOptions).subscribe(response => {
      this.isLoading = false;
      this.reportResult = response;
      this.querySummary = "Showing ("+ this.reportResult.length+ ") results for all drivers for " + this.df;
      console.log(response);
    }, error => {
      this.isLoading = false;
      this.alertifyService.error('Error getting delivery view ');
    });
  }

  ngOnInit() {
    this.getDailyDeliveryViews();
  }

  df = formatDate(new Date(), 'dd/MM/yyyy', 'en');

  querySummary: string = "";

  getReport(form: NgForm) {
    if (this.driverId !== 'Select Driver') {

      let s = {
        'driverId': this.driverId,
        'deliveryStatus': this.deliveryStatus.toString(),
        'startDate': form.value.startDate,
        'endDate': form.value.endDate,
      };

      console.log(s);


      let sd = new Date(s.startDate);
      let ed = new Date(s.endDate);

      if (sd > ed) {
        this.alertifyService.error("Start date cannot be after end date");
      } else {

        let today = new Date();
        if (ed > today) {
          this.alertifyService.error("Your end day cannot go beyond today");
        } else {
          
          this.isLoading = true;
          return this.http.post<DeliveryView[]>(this.restService.baseUrl + 'deliveries/driver-report', s, this.httpPostOptions)
            .subscribe(
              response => {
                this.reportResult = response;
                this.isLoading = false;
                console.log(this.reportResult.length);

                let f: string = "all"
                switch (s.deliveryStatus) {
                  case "0":
                    f = "All";
                    break;
                  case "3":
                    f = "Complete";
                    break;
                  case "2":
                    f = "In Progress";
                    break;
                  default:
                    f = "Not Started";
                    break

                }
                let x ="";

                if(s.driverId === "all"){
                  x = "all";
                }else{
                  let driverName = this.drivers.filter(d => d.id === s.driverId)[0];
                  x = driverName.firstName;
                }

                this.querySummary = "Showing (" + this.reportResult.length + ") results for " + f +
                  " deliveries by   Driver: " + x + " starting from " + s.startDate + " to " + s.endDate;

              }, error => {
                this.alertifyService.error("Unable to complete this request please try again");
                this.isLoading = false;
              }
            );
        }


      }


    } else {
      this.alertifyService.warning("select a driver to proceed");
    }


  }

  changeDriver(event) {
    this.driverId = event.target.value;
    console.log(event.target.value);
  }

  changeStatus(event) {
    this.deliveryStatus = event.target.value;
  }


}

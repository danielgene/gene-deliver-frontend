import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-completed-deliveries',
  templateUrl: './completed-deliveries.component.html',
  styleUrls: ['./completed-deliveries.component.css']
})
export class CompletedDeliveriesComponent implements AfterViewInit {

  @Input('completedDeliveriesDataSource') completedDeliveriesDataSource;
  @Input('displayedColumns') displayedColumns: string[];

  constructor() {
  }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    //this.allDeliveriesDataSource.paginator = this.paginator;
    this.completedDeliveriesDataSource.sort = this.sort;
    console.log('afterview');
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  showAlert(s) {
    alert(s);
  }


}

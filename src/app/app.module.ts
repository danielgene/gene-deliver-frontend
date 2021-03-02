import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './_shared/material/material.module';
import {DeliveryComponent} from './components/admin/delivery/delivery.component';
import {AuthComponent} from './components/auth/auth.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthService} from './_shared/auth.service';
import {MatTableModule} from '@angular/material/table';
import {JobAddComponent} from './components/jobs/job-add/job-add.component';
import {JobsComponent} from './components/jobs/jobs/jobs.component';
import {DriversComponent} from './components/admin/drivers/drivers.component';
import {DriverViewComponent} from './components/admin/driver-view/driver-view.component';
import {DriverAddComponent} from './components/admin/driver-add/driver-add.component';
import {MyDeliveriesComponent} from './components/driver/my-deliveries/my-deliveries.component';

import {LandingPageComponent} from './landing-page/landing-page.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NavComponent} from './dashboard/includes/nav/nav.component';
import {SideBarComponent} from './dashboard/includes/side-bar/side-bar.component';
import {LostDeliveryComponent} from './components/lost-delivery/lost-delivery.component';
import {ViewDriverComponent} from './components/admin/view-driver/view-driver.component';
import {ZonesComponent} from './components/admin/zones/zones.component';
import {AddZoneComponent} from './components/admin/zones/add-zone/add-zone.component';
import {ZoneAreasComponent} from './components/admin/zones/zone-areas/zone-areas.component';
import {AddDeliveryComponent} from './components/lost-delivery/add-delivery/add-delivery.component';
import {AssignZoneComponent} from './components/admin/zones/assign-zone/assign-zone.component';
import {ViewDeliveryComponent} from './components/driver/view-delivery/view-delivery.component';
import {IncompleteDeliveryComponent} from './components/driver/incomplete-delivery/incomplete-delivery.component';
import {CompleteDeliveryComponent} from './components/driver/complete-delivery/complete-delivery.component';
import {SuperComponent} from './components/super/super.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {DriverSwapComponent} from './components/admin/driver-swap/driver-swap.component';
import {ExcelService} from './_shared/excel.service';
import {AdminAddComponent} from './components/admin/admin-add/admin-add.component';
import {EditDeliveryComponent} from './components/admin/edit-delivery/edit-delivery.component';
import {AgentHomeComponent} from './components/agent/agent-home/agent-home.component';
import {RolesComponent} from './components/admin/roles/roles/roles.component';
import {AddRoleComponent} from './components/admin/roles/add-role/add-role.component';
import {AgentAddComponent} from './components/admin/agent/agent-add/agent-add.component';
import {ChangePasswordComponent} from './components/auth/change-password/change-password.component';
import {ProfileComponent} from './components/auth/profile/profile.component';

import {TableModule} from 'primeng/table';
import {AgGridModule} from "ag-grid-angular";
import {DataTablesModule} from "angular-datatables";
import { AlertDialogComponent } from './_shared/alert-dialog/alert-dialog.component';
import { ShortenPipe } from './_shared/shorten.pipe';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { AllDeliveriesComponent } from './components/admin/delivery/all-deliveries/all-deliveries.component';
import { PendingDeliveriesComponent } from './components/admin/delivery/pending-deliveries/pending-deliveries.component';
import { CompletedDeliveriesComponent } from './components/admin/delivery/completed-deliveries/completed-deliveries.component';
import { ReportsComponent } from './components/admin/delivery/reports/reports.component';
import { OverviewComponent } from './overview/overview.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeliveryComponent,
    AuthComponent,
    JobAddComponent,
    JobsComponent,
    DriversComponent,
    DriverViewComponent,
    DriverAddComponent,
    MyDeliveriesComponent,
    LandingPageComponent,
    DashboardComponent,
    NavComponent,
    SideBarComponent,
    LostDeliveryComponent,
    ViewDriverComponent,
    ZonesComponent,
    AddZoneComponent,
    ZoneAreasComponent,
    AddDeliveryComponent,
    AssignZoneComponent,
    ViewDeliveryComponent,
    IncompleteDeliveryComponent,
    CompleteDeliveryComponent,
    SuperComponent,
    DriverSwapComponent,
    AdminAddComponent,
    EditDeliveryComponent,
    AgentHomeComponent,
    RolesComponent,
    AddRoleComponent,
    AgentAddComponent,
    ChangePasswordComponent,
    ProfileComponent,
    AlertDialogComponent,
    ShortenPipe,
    AllDeliveriesComponent,
    PendingDeliveriesComponent,
    CompletedDeliveriesComponent,
    ReportsComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    AgGridModule,
    DataTablesModule,
    MatPaginatorModule,
    MatSortModule,

  ],
  providers: [
    AuthService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ExcelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

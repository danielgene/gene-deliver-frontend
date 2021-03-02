import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DeliveryComponent} from './components/admin/delivery/delivery.component';
import {AuthComponent} from './components/auth/auth.component';
import {GuardsGuard} from './_shared/guards.guard';
import {DriversComponent} from './components/admin/drivers/drivers.component';
import {RolesGuard} from './_shared/roles.guard';
import {DriverAddComponent} from './components/admin/driver-add/driver-add.component';

import {LandingPageComponent} from "./landing-page/landing-page.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MyDeliveriesComponent} from "./components/driver/my-deliveries/my-deliveries.component";
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
import {DriverSwapComponent} from './components/admin/driver-swap/driver-swap.component';
import {AdminAddComponent} from './components/admin/admin-add/admin-add.component';
import {EditDeliveryComponent} from './components/admin/edit-delivery/edit-delivery.component';
import {AgentHomeComponent} from './components/agent/agent-home/agent-home.component';
import {RolesComponent} from './components/admin/roles/roles/roles.component';
import {AddRoleComponent} from './components/admin/roles/add-role/add-role.component';
import {AgentAddComponent} from './components/admin/agent/agent-add/agent-add.component';
import {ProfileComponent} from './components/auth/profile/profile.component';
import {ReportsComponent} from "./components/admin/delivery/reports/reports.component";
import {OverviewComponent} from "./overview/overview.component";

const routes: Routes = [
  //ADMIN AND SUPER ROUTES
  // {path: 'allocations', component: AllocationsComponent, canActivate: [GuardsGuard] },

  {
    path: '', component: DashboardComponent, canActivate: [GuardsGuard],
    children: [
      {path:'',component:OverviewComponent,pathMatch:'full'},
      {path: 'mydeliveries', component: MyDeliveriesComponent, /* canActivate: [GuardsGuard]*/},
      {path: 'incomplete', component: IncompleteDeliveryComponent},
      {path: 'complete', component: CompleteDeliveryComponent},
      {path: 'view-delivery/:id', component: ViewDeliveryComponent},
      {path: 'deliveries-overview', component: DeliveryComponent, /*canActivate: [RolesGuard]*/},
      {path: 'edit-delivery/:id', component: EditDeliveryComponent},
      {path: 'drivers', component: DriversComponent},
      {path: 'lost-delivery', component:LostDeliveryComponent},
      {path: 'lost-delivery/:id', component: AddDeliveryComponent},
      {path: 'zones', component: ZonesComponent},
      {path: 'assign-zone', component: AssignZoneComponent},
      {path: 'swap-driver', component: DriverSwapComponent},
      {path: 'add-zone', component: AddZoneComponent},
      {path: 'zone-areas/:id', component: ZoneAreasComponent},
      {path: 'view-driver/:id', component: ViewDriverComponent},
      {path: 'driver-add', component: DriverAddComponent},
      {path: 'admin-add', component: AdminAddComponent},
      {path: 'agent-add', component: AgentAddComponent},
      // PATH FOR ROLES
      {path: 'roles', component: RolesComponent},
      {path: 'add-role', component: AddRoleComponent},
      {path: 'agent-home', component: AgentHomeComponent},
      // account management
      {path: 'profile', component: ProfileComponent}
    ]
  },
  {path: 'login', component: AuthComponent},
  {path: 'welcome', component: LandingPageComponent},
  //{path: 'allocations/:id', component: AllocationViewComponent, canActivate: [GuardsGuard]},
  // {path: 'driver-add', component: DriverAddComponent, canActivate: [RolesGuard]},
  // DRIVER VIEWS AND ROUTES
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

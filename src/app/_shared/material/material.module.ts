import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';

const MaterialComponents = [
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatExpansionModule,
  MatCardModule,
  MatTabsModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTableModule,
  MatDatepickerModule
];

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }

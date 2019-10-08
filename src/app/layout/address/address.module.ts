import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddressComponent} from './address.component';
import {AddressRoutingModule} from './address-routing.module';
import {
  DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatButtonModule, MatCardModule, MatDatepickerModule,
  MatDividerModule, MatIconModule, MatInputModule, MatNativeDateModule, MatSelectModule, MatSnackBarModule,
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentUtcDateAdapter} from '../../moment-utc-date-adapter';
import {MAT_MOMENT_DATE_FORMATS, MatMomentDateModule} from '@angular/material-moment-adapter';


// import { StatModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    AddressRoutingModule, FormsModule, ReactiveFormsModule,
    FlexLayoutModule, MatMomentDateModule,
    // angular material
    MatDividerModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule, MatSnackBarModule, MatDatepickerModule,
    MatNativeDateModule, MatSelectModule, MatIconModule
  ],
  declarations: [
    AddressComponent,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
  ],
})
export class AddressModule {}

import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {PersonComponent} from './person.component';
import {PersonRoutingModule} from './person-routing.module';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE, MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatNativeDateModule, MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule,
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentUtcDateAdapter} from '../../moment-utc-date-adapter';
import {MAT_MOMENT_DATE_FORMATS, MatMomentDateModule} from '@angular/material-moment-adapter';
import { PersonalComponent } from './personal/personal.component';
import { EducationComponent } from './education/education.component';
import { EmploymentComponent } from './employment/employment.component';
import { CareerComponent } from './career/career.component';
import { PhotographComponent } from './photograph/photograph.component';
import {FileSelectDirective} from 'ng2-file-upload';
import {AuthInterceptor} from '../../shared/services/auth.interceptor';


// import { StatModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    PersonRoutingModule, FormsModule, ReactiveFormsModule,
    FlexLayoutModule, MatMomentDateModule, HttpClientModule,
    // angular material
    MatDividerModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule, MatSnackBarModule, MatDatepickerModule,
    MatNativeDateModule, MatSelectModule, MatIconModule, MatTabsModule, MatExpansionModule, MatCheckboxModule, MatAutocompleteModule,
    MatListModule, MatRadioModule
  ],
  declarations: [
    PersonComponent,
    PersonalComponent,
    EducationComponent,
    EmploymentComponent,
    CareerComponent,
    PhotographComponent,
    FileSelectDirective,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
  ],
})
export class PersonModule {}

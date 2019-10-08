import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule, ReactiveFormsModule,
    FlexLayoutModule,
    // angular material
    MatInputModule, MatIconModule, MatButtonModule, MatCardModule, MatDividerModule, MatSnackBarModule,
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }

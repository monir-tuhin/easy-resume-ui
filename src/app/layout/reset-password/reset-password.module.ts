import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ResetPasswordRoutingModule} from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import {MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    FormsModule, ReactiveFormsModule,
    FlexLayoutModule,
    // angular material
    MatInputModule, MatIconModule, MatButtonModule, MatCardModule, MatDividerModule, MatSnackBarModule,
  ],
  declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule { }

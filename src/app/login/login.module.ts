import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';
import {ForgotPasswordDialogComponent} from './forgot-password-dialog/forgot-password-dialog.component';


@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    LoginRoutingModule, FlexLayoutModule,
    // angular material
    MatInputModule, MatIconModule, MatButtonModule, MatCardModule, MatSnackBarModule, MatDialogModule,
  ],
  declarations: [LoginComponent, ForgotPasswordDialogComponent],
  entryComponents: [ForgotPasswordDialogComponent]
})

export class LoginModule {}

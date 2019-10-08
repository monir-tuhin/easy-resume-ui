import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSnackBarModule} from '@angular/material';

@NgModule({
    imports: [
      CommonModule, FormsModule, ReactiveFormsModule,
      LoginRoutingModule, FlexLayoutModule,
      // angular material
      MatInputModule, MatIconModule, MatButtonModule, MatCardModule, MatSnackBarModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {}

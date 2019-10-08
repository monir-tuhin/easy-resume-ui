import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule, MatTableModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UserInfoRoutingModule} from './user-info-routing.module';
import {UserInfoComponent} from './user-info.component';


// import { StatModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    UserInfoRoutingModule,
    FlexLayoutModule,
    // StatModule
    // angular material
    MatDividerModule, MatTableModule,
  ],
  declarations: [
    UserInfoComponent,
  ]
})
export class UserInfoModule {}

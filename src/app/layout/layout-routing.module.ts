import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../shared/guard';
import {DbInputModule} from './db-input/db-input.module';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'prefix'},
      {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
      {path: 'dbInput', loadChildren: './db-input/db-input.module#DbInputModule'},
      {path: 'userInfo', loadChildren: './user-info/user-info.module#UserInfoModule'},
      {path: 'person', loadChildren: './person/person.module#PersonModule'},
      {path: 'cvTemplate', loadChildren: './cv-template/cv-template.module#CvTemplateModule'},
      {path: 'resetPassword', loadChildren: './reset-password/reset-password.module#ResetPasswordModule'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class LayoutRoutingModule {}



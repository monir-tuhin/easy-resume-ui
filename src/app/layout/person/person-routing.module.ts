import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PersonComponent} from './person.component';
import {PersonalComponent} from './personal/personal.component';
import {EducationComponent} from './education/education.component';
import {EmploymentComponent} from './employment/employment.component';
import {CareerComponent} from './career/career.component';
import {PhotographComponent} from './photograph/photograph.component';
import {AuthGuard} from '../../shared/guard';



const routes: Routes = [
  {
    path: '', component: PersonComponent,
    children: [
      { path: '',  redirectTo: 'personal', pathMatch: 'full'},
      { path: 'personal', component:  PersonalComponent},
      { path: 'education', component:  EducationComponent},
      { path: 'employment', component:  EmploymentComponent},
      { path: 'career', component:  CareerComponent},
      { path: 'photograph', component:  PhotographComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PersonRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DbInputComponent} from './db-input.component';
import {DistrictComponent} from './district/district.component';
import {UpazilaComponent} from './upazila/upazila.component';
import {PostComponent} from './post/post.component';
import {SkillComponent} from './skill/skill.component';
import {EdulevelComponent} from './edulevel/edulevel.component';
import {ExamComponent} from './exam/exam.component';



const routes: Routes = [
{
  path: '',
  component: DbInputComponent,
  children: [
      { path: '',  redirectTo: 'district', pathMatch: 'full'},
      { path: 'district', component:  DistrictComponent},
      { path: 'upazila', component:  UpazilaComponent},
      { path: 'post', component:  PostComponent},
      { path: 'skill', component:  SkillComponent},
      { path: 'educationLevel', component:  EdulevelComponent},
      { path: 'examTitle', component:  ExamComponent},
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DbInputRoutingModule {}

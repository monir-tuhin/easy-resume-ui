import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CvTemplateComponent } from './cv-template.component';
import {TemplateoneComponent} from './templateone/templateone.component';


const routes: Routes = [
  { path: '', component: CvTemplateComponent },
  { path: 'templateOne', component:  TemplateoneComponent },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CvTemplateRoutingModule {}

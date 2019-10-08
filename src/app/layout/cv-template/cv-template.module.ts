import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvTemplateRoutingModule } from './cv-template-routing.module';
import { CvTemplateComponent } from './cv-template.component';
import {MatButtonModule, MatCheckboxModule, MatDividerModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { TemplateoneComponent } from './templateone/templateone.component';

// import { StatModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    CvTemplateRoutingModule,
    FlexLayoutModule,

    // angular material
    MatDividerModule, MatIconModule, MatButtonModule,

  ],
  declarations: [
    CvTemplateComponent,
    TemplateoneComponent,
  ]
})
export class CvTemplateModule {}

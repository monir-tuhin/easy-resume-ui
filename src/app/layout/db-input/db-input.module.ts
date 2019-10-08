import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DbInputComponent} from './db-input.component';
import {DbInputRoutingModule} from './db-input-routing.module';
import {
  MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSelectModule,
  MatSnackBarModule, MatTableModule, MatTabsModule,
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DistrictComponent } from './district/district.component';
import { UpazilaComponent } from './upazila/upazila.component';
import { PostComponent } from './post/post.component';
import { SkillComponent } from './skill/skill.component';
import { EdulevelComponent } from './edulevel/edulevel.component';
import { ExamComponent } from './exam/exam.component';



@NgModule({
  imports: [
    CommonModule,
    DbInputRoutingModule, FormsModule, ReactiveFormsModule,
    FlexLayoutModule,
    // angular material
    MatDividerModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule, MatSnackBarModule, MatSelectModule,
    MatIconModule, MatTabsModule, MatTableModule, MatPaginatorModule,
  ],
  declarations: [
    DbInputComponent,
    DistrictComponent,
    UpazilaComponent,
    PostComponent,
    SkillComponent,
    EdulevelComponent,
    ExamComponent,
  ]
})
export class DbInputModule {}

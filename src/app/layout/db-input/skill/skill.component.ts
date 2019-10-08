import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  skillForm = new FormGroup({
    skill: new FormControl('', Validators.compose([
      Validators.required
    ])),
  });

  skillId: any;
  isShowSkillUpdate = false;
  displayedColumnsSkill = ['sl', 'skill', 'action'];
  skillList: any;
  skillDataSource: any;

  @ViewChild('skillPaginatorId') paginatorSkill: MatPaginator;

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) {

  }

  ngOnInit() {
    this.getSkillList();
  }

  saveSkill() {
    console.log(this.skillForm.value);
    this.httpClient.post(environment.apiUrl + 'skills', this.skillForm.value)
      .subscribe(res => {
          this.snackbar.open('Successfully Saved', 'Close', {
            duration: 2000
          });
          this.clearSkillFields();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  getSkillList() {
    this.httpClient.get(environment.apiUrl + 'skills')
      .subscribe(
        res => {
          console.log('res' , res);
          // this.skillList = res;
          setTimeout(() => {
            this.skillList = res as any[];
            this.skillDataSource = new MatTableDataSource(this.skillList);
            this.skillDataSource.paginator = this.paginatorSkill;
          });
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  goToEditSkill(element) {
    /*  console.log(this.skillForm.value);
      console.log(element);*/
    this.isShowSkillUpdate = true;
    this.skillForm.controls.skill.setValue(element.skill);
    this.skillId = element._id;
  }

  updateSkill() {
    const submitData = {
      skill: this.skillForm.value.skill
    };

    const myParams = new HttpParams().append('id', this.skillId)
    this.httpClient.put(environment.apiUrl + 'skills', submitData,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully Updated', 'Close', {
            duration: 2000
          });
          this.clearSkillFields();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  deleteSkill(element) {
    const myParams = new HttpParams().append('id', element._id)
    this.httpClient.delete(environment.apiUrl + 'skills',
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully Deleted', 'Close', {
            duration: 2000
          });
          this. getSkillList();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  clearSkillFields() {
    this.skillForm.reset();
    this.getSkillList();
    this.isShowSkillUpdate = false;
  }

}

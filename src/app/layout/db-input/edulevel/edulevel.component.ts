import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-edulevel',
  templateUrl: './edulevel.component.html',
  styleUrls: ['./edulevel.component.css']
})
export class EdulevelComponent implements OnInit {
  educationLevelForm = new FormGroup({
    educationLevel: new FormControl('', Validators.compose([
      Validators.required
    ])),
  });

  educationLevelId: any;
  isShowEducationLevelUpdate = false;
  displayedColumnsEducationLevel = ['sl', 'educationLevel', 'action'];
  educationLevelList: any;
  educationLevelDataSource: any;

  @ViewChild('educationLevelPaginatorId') paginatorEducationLevel: MatPaginator;

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) {

  }

  ngOnInit() {
    this.getEducationLevelList();
  }

  saveEducationLevel() {
    console.log(this.educationLevelForm.value);
    this.httpClient.post(environment.apiUrl + 'educationLevels', this.educationLevelForm.value)
      .subscribe(res => {
          this.snackbar.open('Successfully Saved', 'Close', {
            duration: 2000
          });
          this.clearEducationLevelFields();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  getEducationLevelList() {
    this.httpClient.get(environment.apiUrl + 'educationLevels')
      .subscribe(
        res => {
          console.log('res' , res);
          // this.educationLevelList = res;
          setTimeout(() => {
            this.educationLevelList = res as any[];
            this.educationLevelDataSource = new MatTableDataSource(this.educationLevelList);
            this.educationLevelDataSource.paginator = this.paginatorEducationLevel;
          });
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  goToEditEducationLevel(element) {
    /*  console.log(this.educationLevelForm.value);
      console.log(element);*/
    this.isShowEducationLevelUpdate = true;
    this.educationLevelForm.controls.educationLevel.setValue(element.educationLevel);
    this.educationLevelId = element._id;
  }

  updateEducationLevel() {
    const submitData = {
      educationLevel: this.educationLevelForm.value.educationLevel
    };

    const myParams = new HttpParams().append('id', this.educationLevelId)
    this.httpClient.put(environment.apiUrl + 'educationLevels', submitData,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully Updated', 'Close', {
            duration: 2000
          });
          this.clearEducationLevelFields();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  deleteEducationLevel(element) {
    const myParams = new HttpParams().append('id', element._id)
    this.httpClient.delete(environment.apiUrl + 'educationLevels',
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully Deleted', 'Close', {
            duration: 2000
          });
          this. getEducationLevelList();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  clearEducationLevelFields() {
    this.educationLevelForm.reset();
    this.getEducationLevelList();
    this.isShowEducationLevelUpdate = false;
  }

}

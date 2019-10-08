import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserService} from '../../../shared/services/user.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.css']
})
export class EmploymentComponent implements OnInit {
  employmentForm = new FormGroup({
    companyName: new FormControl('', Validators.compose([
      Validators.required
    ])),
    designation: new FormControl('', Validators.compose([
      Validators.required
    ])),
    jobPeriodFrom: new FormControl('', Validators.compose([
      Validators.required
    ])),
    jobPeriodTo: new FormControl(),
    currentlyWorking: new FormControl(),
    responsibilities: new FormControl(),
    user: new FormControl(localStorage.getItem('userId'), Validators.compose([
      Validators.required
    ])),
  });

  employmentId: any;
  employmentList: any = [];
  isShowSaveExpe: boolean = false;
  isShowUpdateBtn: boolean = false;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private snackbar: MatSnackBar, private userService: UserService) {

  }

  ngOnInit() {
    this.getEmployments();
  }

  clearFields () {
    this.employmentForm.controls.companyName.reset();
    this.employmentForm.controls.designation.reset();
    this.employmentForm.controls.jobPeriodFrom.reset();
    this.employmentForm.controls.jobPeriodTo.reset();
    this.employmentForm.controls.currentlyWorking.reset();
    this.employmentForm.controls.responsibilities.reset();

    // this.employmentForm.reset();
  }

  saveEmployment() {
    if (this.employmentForm.value.currentlyWorking == null) {
      this.employmentForm.value.currentlyWorking = false;
    }

    if (this.employmentForm.value.currentlyWorking === true) {
      this.employmentForm.controls.jobPeriodTo.reset();
    }

    this.httpClient.post(environment.apiUrl + 'employments', this.employmentForm.value)
      .subscribe(res => {
          this.snackbar.open('Successfully saved', 'Close', {
            duration: 2000
          });
          this.clearFields ();
          this.getEmployments();

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  getEmployments() {
    const myParams = new HttpParams().append('user',  localStorage.getItem('userId'))
    this.httpClient.get(environment.apiUrl + 'employments/getByUser',
      {params: myParams})
      .subscribe(
        res => {
          console.log('employmentList' , res);
          this.employmentList = res;
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  toEditEmployment(employment) {
    console.log(employment);

    this.employmentId = employment._id;
    this.employmentForm.controls.companyName.setValue(employment.companyName);
    this.employmentForm.controls.designation.setValue(employment.designation);
    this.employmentForm.controls.jobPeriodFrom.setValue(employment.jobPeriodFrom);
    this.employmentForm.controls.jobPeriodTo.setValue(employment.jobPeriodTo);
    this.employmentForm.controls.currentlyWorking.setValue(employment.currentlyWorking);
    this.employmentForm.controls.responsibilities.setValue(employment.responsibilities);
    // this.employmentForm.controls.user.setValue(employment.user);

    this.isShowSaveExpe = true;
    this.isShowUpdateBtn = false;
  }

  updateEmployment() {
    if (this.employmentForm.value.currentlyWorking == null) {
      this.employmentForm.value.currentlyWorking = false;
    }

    if (this.employmentForm.value.currentlyWorking === true) {
      this.employmentForm.controls.jobPeriodTo.reset();
    }

    const myParams = new HttpParams().append('id', this.employmentId)
    this.httpClient.put(environment.apiUrl + 'employments', this.employmentForm.value,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully updated', 'Close', {
            duration: 2000
          });
          this.close();
          this.isShowUpdateBtn = true;

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  deleteEmployment(employment) {
    const myParams = new HttpParams().append('id', employment._id)
    this.httpClient.delete(environment.apiUrl + 'employments',
      {params: myParams})
      .subscribe(
        res => {
          this.snackbar.open('Successfully deleted', 'Close', {
            duration: 2000
          });
          this.getEmployments();
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  addExperience() {
    this.isShowSaveExpe = true;
    this.isShowUpdateBtn = true;
  }

  close() {
    this.getEmployments();
    this.isShowSaveExpe = false;
    this.clearFields ();
  }

}

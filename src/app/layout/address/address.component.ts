import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatDatepicker, MatSnackBar} from '@angular/material';
import {UserService} from '../../shared/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-person',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  personUpdateForm = new FormGroup({
    name: new FormControl('', Validators.compose([
      Validators.required
    ])),
    email: new FormControl('', Validators.compose([
      Validators.required,
    ])),
    dob: new FormControl(''),
    phone: new FormControl('', Validators.compose([
      Validators.required
    ])),
    bloodGroup: new FormControl(''),
  });

  id: any;
  dob;

  personalInfo: any = {};

  showPersonalInfo = false;
  updateUi = false;



  bloodGroupList: any = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  districtList: any = ['Dhaka', 'Khulna', 'Satkhira', 'Jashor', 'Faridpur' ];

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private snackbar: MatSnackBar, private userService: UserService) {

  }

  ngOnInit() {
    this.getPersonalInfo();
  }

  getPersonalInfo() {
    this.httpClient.get(environment.apiUrl + 'users/me')
      .subscribe(
        res => {
          console.log('res' , res);
          this.personalInfo = res;
          this.dob = moment(this.personalInfo.dob).format('DD-MM-YYYY');
        },
        msg => {
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  toEditPerson(personalInfo) {
    console.log(personalInfo);

    this.id = personalInfo._id;
    this.personUpdateForm.controls.name.setValue(personalInfo.name);
    this.personUpdateForm.controls.email.setValue(personalInfo.email);
    this.personUpdateForm.controls.dob.setValue(personalInfo.dob);
    this.personUpdateForm.controls.phone.setValue(personalInfo.phone);
    this.personUpdateForm.controls.bloodGroup.setValue(personalInfo.bloodGroup);

    this.updateUi = true;
  }

  updatePersonInfo() {
    const submitData = {
      name: this.personUpdateForm.value.name,
      email: this.personUpdateForm.value.email,
      dob: this.personUpdateForm.value.dob,
      phone: this.personUpdateForm.value.phone,
      bloodGroup: this.personUpdateForm.value.bloodGroup,
    };
    console.log(submitData);

    const myParams = new HttpParams().append('id', this.id)
    this.httpClient.put(environment.apiUrl + 'users', submitData,
      {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Successfully Updated', 'Close', {
            duration: 2000
          });
          this. getPersonalInfo();
          this.updateUi = false;

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

  cancelUpdate() {
    this.updateUi = false;
  }

}

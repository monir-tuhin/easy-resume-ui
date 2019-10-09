import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {PasswordValidationComponent} from '../shared/services/password-validation';

@Component({
  selector: 'app-create-user',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  createUserForm: FormGroup;


  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar, private fb: FormBuilder) {
    this.createUserForm = fb.group({
        name: new FormControl(''),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        ])),
       /* retypePassword: new FormControl('', Validators.compose([
          Validators.required,
        ]))*/
      }
      /*{
        validator: PasswordValidationComponent.MatchPassword // your validation method
      }*/
    );

  }

  ngOnInit() {
  }


  saveUser() {
    console.log(this.createUserForm.value);

    this.httpClient.post(environment.apiUrl + 'users', this.createUserForm.value)
      .subscribe(
        res => {
          console.log('res' , res);
          this.snackbar.open('Successfully signed Up', 'Close', {
            duration: 2000
          });
          this.createUserForm.reset();
        },
        msg => {
          console.log('dddd', msg);
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }

}

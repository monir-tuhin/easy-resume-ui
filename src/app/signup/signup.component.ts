import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-create-user',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  createUserForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) { }

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

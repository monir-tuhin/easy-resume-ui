import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  urlToken: any = '';

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.urlToken = this.activeRoute.snapshot.queryParams.token;
    console.log(this.urlToken);
  }


  sendEmail() {
    // console.log(this.sendEmailForm.value);
    const myParams = new HttpParams().append('resetPasswordToken', this.urlToken)
    this.httpClient.put(environment.apiUrl + 'resetPassword/resetPasswordByToken', {params: myParams})
      .subscribe(res => {
          this.snackbar.open('Email Sent', 'Close', {
            duration: 2000
          });

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }


}

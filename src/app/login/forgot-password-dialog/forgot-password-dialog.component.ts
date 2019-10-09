import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.css']
})
export class ForgotPasswordDialogComponent implements OnInit {
  // send email
  sendEmailForm = new FormGroup({
    sendEmail: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    ])),
  });

  email: any = '';
  emailSentMsg: any = '';
  isResultShow = false;

  constructor(private snackbar: MatSnackBar, private router: Router, private activeRoute: ActivatedRoute,
              private httpClient: HttpClient, public dialog: MatDialog, public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendEmail() {
    // console.log(this.sendEmailForm.value);
    this.emailSentMsg = '';
    this.isResultShow = true;
    this.httpClient.put(environment.apiUrl + 'resetPassword/forgotPassword', this.sendEmailForm.value)
      .subscribe(res => {
          this.snackbar.open('Email Sent', 'Close', {
            duration: 2000
          });
          this.isResultShow = false;
          this.emailSentMsg = 'A password reset link has sent to your email. The link will remain active for 1 hour.';

        },  msg => {
          this.isResultShow = false;
          this.snackbar.open(msg.error, 'Close', {
            duration: 4000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }


}

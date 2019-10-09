import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AuthService} from '../shared/services/auth.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ForgotPasswordDialogComponent} from './forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  // send email
  sendEmailForm = new FormGroup({
    sendEmail: new FormControl(''),
  });
  showResetPw: boolean = false;


  constructor(private authService: AuthService, private httpClient: HttpClient, private router: Router, private route: ActivatedRoute,
              private snackbar: MatSnackBar, public dialog: MatDialog) { }


  ngOnInit() {
    this.authService.logout();
  }

  onLoggedin(loginForm): void {
    console.log(loginForm);
    this.authService.logIn(loginForm.email, loginForm.password)
      .subscribe(res => {
          this.router.navigate(['/dashboard']);
          this.snackbar.open('Successfully logged in', 'Close', {
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



  // send email
  openForgotPwUi() {
    /*this.showResetPw = true;*/
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, {
      width: '35%',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  sendEmail() {
    console.log(this.sendEmailForm.value);

    this.httpClient.put(environment.apiUrl + 'resetPassword/forgotPassword', this.sendEmailForm.value)
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

import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidationComponent} from '../../shared/services/password-validation';

@Component({
  selector: 'app-create-user',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  pwResetForm: FormGroup;
  urlToken: any = '';

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar, private router: Router,
              private activeRoute: ActivatedRoute, private fb: FormBuilder) {

    this.pwResetForm = fb.group({
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        ])),
        retypePassword: new FormControl('', Validators.compose([
          Validators.required,
        ]))
      },
      {
        validator: PasswordValidationComponent.MatchPassword // your validation method
      }
    );

  }

  ngOnInit() {
    this.urlToken = this.activeRoute.snapshot.queryParams.token;
    console.log(this.urlToken);
  }


  resetPassword() {
    const submit = {
      resetPasswordToken: this.urlToken,
      password: this.pwResetForm.value.password
    };

    console.log('submitDate', submit);
    this.httpClient.put(environment.apiUrl + 'resetPassword/resetPasswordByToken', submit)
      .subscribe(res => {
          this.snackbar.open('Password reset successful !', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/login']);

        },  msg => {
          this.snackbar.open(msg.error, 'Close', {
            duration: 5000
          });
          console.error(`Error: ${msg.status} ${msg.statusText}`);
        }
      );
  }


}

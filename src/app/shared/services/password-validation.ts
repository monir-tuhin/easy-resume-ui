import {AbstractControl} from '@angular/forms';


export class PasswordValidationComponent {

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const retypePassword = AC.get('retypePassword').value; // to get value in input tag
    if (password != retypePassword) {
      console.log('false');
      AC.get('retypePassword').setErrors( {MatchPassword: true} );
    } else {
      console.log('true');
      return null;
    }
  }
}
